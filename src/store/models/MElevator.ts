import { action, makeObservable, observable } from 'mobx';
import { generateRandomKey } from '../../utils/common';

const ELEVATOR_DELAY = 5000;

/**
 * The MElevator class is a MobX-powered model representing an elevator in a building.
 * It provides methods and properties for controlling the elevator's state, such as its current floor, door status, and handling elevator calls.
 */

class MElevator {
  public id: string;

  private currentFloor: number;

  private numberOfFloors: number;

  private elevatorCabinElement: HTMLDivElement | null;

  private audioElement: HTMLAudioElement | null;

  private timeoutId?: NodeJS.Timeout;

  public areDoorsOpen: boolean;

  public isBusy: boolean;

  // Callback Functions
  private callElevatorStartCallback: (targetFloor: number) => void;

  private callElevatorCompleteCallback: (currentFloor: number) => void;

  /**
   * Constructor to initialize an elevator instance.
   * @param numberOfFloors - Total number of floors in the building.
   * @param currentFloor - Current floor where the elevator is located.
   * @param callElevatorStartCallback - Callback for elevator call initiation.
   * @param callElevatorCompleteCallback - Callback for elevator call completion.
   */
  constructor(
    numberOfFloors: number,
    currentFloor: number,
    callElevatorStartCallback: (targetFloor: number) => void,
    callElevatorCompleteCallback: (currentFloor: number) => void
  ) {
    this.id = generateRandomKey();
    this.numberOfFloors = numberOfFloors;
    this.currentFloor = currentFloor;
    this.elevatorCabinElement = null;
    this.audioElement = null;
    this.isBusy = false;
    this.areDoorsOpen = false;
    this.callElevatorStartCallback = callElevatorStartCallback;
    this.callElevatorCompleteCallback = callElevatorCompleteCallback;

    // Make properties observable
    makeObservable<this, 'setAreDoorsOpen'>(this, {
      areDoorsOpen: observable,
      isBusy: observable,
      setAreDoorsOpen: action,
    });
  }

  private setAreDoorsOpen(areDoorsOpen: boolean) {
    this.areDoorsOpen = areDoorsOpen;
  }

  /**
   * Sets the elevator cabin element reference.
   * @param elevatorCabinElement - Reference to the elevator cabin element.
   */
  public setElevatorCabinElement(elevatorCabinElement: HTMLDivElement | null) {
    this.elevatorCabinElement = elevatorCabinElement;
    this.elevatorCabinElement?.addEventListener(
      'transitionend',
      this.handleAnimationComplete
    );
  }

  public setAudioElement(audioElement: HTMLAudioElement | null) {
    this.audioElement = audioElement;
  }

  public getNumberOfFloors(): number {
    return this.numberOfFloors;
  }

  public getCurrentFloor(): number {
    return this.currentFloor;
  }

  private getElevatorCabinPosition(): number {
    return this.currentFloor * -100;
  }

  /**
   * Updates the position of the elevator cabin and animates the transition.
   * @param duration - The duration of the animation in seconds.
   */
  private updateElevatorCabinPosition(duration: number): void {
    if (this.elevatorCabinElement) {
      this.elevatorCabinElement.style.transitionDuration = `${duration}s`;
      this.elevatorCabinElement.style.transform = `translateY(${this.getElevatorCabinPosition()}%)`;
    }
  }

  private openDoor() {
    this.setAreDoorsOpen(true);
    this.timeoutId = setTimeout(() => {
      this.cancelCallElevator();
    }, ELEVATOR_DELAY);
  }

  public holdElevator(): void {
    clearTimeout(this.timeoutId);
  }

  /**
   * Initiates a call to the elevator to move to the target floor.
   * @param targetFloor - The floor to which the elevator is called.
   */
  public callElevator(targetFloor: number): void {
    // Mark the elevator as busy
    this.isBusy = true;

    // Invoke the callback to start the elevator call
    this.callElevatorStartCallback(targetFloor);

    // Cancel close door
    clearTimeout(this.timeoutId);

    // Check if the elevator is already on the target floor
    if (this.currentFloor === targetFloor) {
      // If already on the target floor, open door
      this.handleAnimationComplete();
    } else {
      // If not on the target floor
      if (this.areDoorsOpen) {
        // If the doors are open, complete the current call and close the doors
        this.callElevatorCompleteCallback(this.currentFloor);
        this.setAreDoorsOpen(false);
      }

      // Calculate the duration for the elevator to move between floors
      const duration =
        Math.abs(this.currentFloor - targetFloor) * (7 / this.numberOfFloors);

      // Update the current floor to the target floor
      this.currentFloor = targetFloor;

      // Update the elevator cabin's position with the calculated duration
      this.updateElevatorCabinPosition(duration);
    }
  }

  /**
   * Cancels the current elevator call and resets the elevator's state.
   */
  public cancelCallElevator(): void {
    this.setAreDoorsOpen(false);
    this.isBusy = false;
    this.callElevatorCompleteCallback(this.currentFloor);
  }

  /**
   * Cleans up the elevator's resources and event listeners.
   */
  public cleanup(): void {
    this.elevatorCabinElement?.removeEventListener(
      'transitionend',
      this.handleAnimationComplete
    );
    this.elevatorCabinElement = null;
  }

  /**
   * Handles the completion of the elevator cabin's animation.
   * This method plays an audio notification and opens the elevator doors.
   */
  private handleAnimationComplete = () => {
    // Play an audio notification if available
    this.audioElement?.play();
    this.openDoor();
  };
}

export default MElevator;
