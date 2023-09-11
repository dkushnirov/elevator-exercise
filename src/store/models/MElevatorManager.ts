import { action, makeObservable, observable, runInAction } from 'mobx';
import MElevator from './MElevator';

/**
 * MElevatorManager class represents the manager for a group of elevators
 * within a multi-story building.
 */
class MElevatorManager {
  private numberOfFloors: number;

  private numberOfElevators: number;

  private elevators: MElevator[];

  private elevatorQueue: number[];

  private activeQueue: Set<number>;

  /**
   * Creates a new instance of the MElevatorManager class.
   * @param numberOfFloors The total number of floors in the building.
   * @param numberOfElevators The total number of elevators in the manager.
   */
  constructor(numberOfFloors: number, numberOfElevators: number) {
    this.numberOfFloors = numberOfFloors;
    this.numberOfElevators = numberOfElevators;
    this.elevatorQueue = [];
    this.elevators = [];
    this.activeQueue = new Set();

    for (let i = 0; i < this.numberOfElevators; i++) {
      this.elevators.push(
        new MElevator(
          this.numberOfFloors,
          1,
          this.handlerCallElevatorStart,
          this.handlerCallElevatorComplete
        )
      );
    }

    makeObservable<
      this,
      'elevatorQueue' | 'processElevatorQueue' | 'removeFromElevatorQueue'
    >(this, {
      elevatorQueue: observable,
      addToElevatorQueue: action,
      processElevatorQueue: action,
      removeFromElevatorQueue: action,
    });
  }

  /**
   * Returns the total number of floors in the building.
   * @returns The number of floors.
   */
  public getNumberOfFloors(): number {
    return this.numberOfFloors;
  }

  /**
   * Returns the total number of elevators in the manager.
   * @returns The number of elevators.
   */
  public getNumberOfElevators(): number {
    return this.numberOfElevators;
  }

  /**
   * Returns an array of elevators managed by this manager.
   * @returns An array of MElevator instances.
   */
  public getElevators(): MElevator[] {
    return this.elevators;
  }

  /**
   * Returns the current elevator queue.
   * @returns An array of floor numbers representing the elevator queue.
   */
  public getElevatorQueue(): number[] {
    return this.elevatorQueue;
  }

  /**
   * Adds a floor to the elevator queue.
   * @param floor The floor to be added to the queue.
   */
  public addToElevatorQueue(floor: number): void {
    if (this.elevatorQueue.indexOf(floor) === -1) {
      this.elevatorQueue = [...this.elevatorQueue, floor];
    }
    runInAction(() => {
      this.processElevatorQueue();
    });
  }

  /**
   * Adds a floor to the active queue, indicating that it is being served by an elevator.
   * @param floor The floor to be added to the active queue.
   */
  public addToActiveQueue(floor: number): void {
    this.activeQueue.add(floor);
  }

  /**
   * Finds the nearest available elevator and requests it to the specified floor.
   * @param elevators An array of MElevator instances to choose from.
   * @param floor The target floor to which the elevator is called.
   */
  private callNearestElevator(elevators: MElevator[], floor: number): void {
    let nearestElevator: MElevator | null = null;
    let minDistance = this.numberOfFloors;
    for (let i = 0; i < elevators.length; i++) {
      const elevator = elevators[i];
      const distance = Math.abs(elevator.getCurrentFloor() - floor);
      if (distance < minDistance) {
        nearestElevator = elevator;
        minDistance = distance;
      }
    }

    if (nearestElevator !== null) nearestElevator.callElevator(floor);
  }

  /**
   * Processes the elevator queue and assigns available elevators to requested floors.
   * If there are pending elevator requests and available elevators, it assigns the nearest available elevator to the requested floor.
   */
  private processElevatorQueue(): void {
    const elevators = this.elevators.filter((item) => !item.isBusy);
    if (this.elevatorQueue.length && elevators.length) {
      const floor = this.elevatorQueue.find(
        (item) => !this.activeQueue.has(item)
      );

      if (floor) {
        this.callNearestElevator(elevators, floor);
      }
    }
  }

  /**
   * Removes a floor from the active queue and elevator queue.
   *
   * @param floor - The floor to be removed from both the active queue and elevator queue.
   */
  private removeFromElevatorQueue(floor: number): void {
    this.activeQueue.delete(floor);
    this.elevatorQueue = this.elevatorQueue.filter((item) => item !== floor);
  }

  public handlerCallElevatorStart = (targetFloor: number) => {
    this.addToActiveQueue(targetFloor);
  };

  public handlerCallElevatorComplete = (floor: number) => {
    this.removeFromElevatorQueue(floor);
    this.processElevatorQueue();
  };

  public cleanup(): void {
    this.elevators.map((item) => item.cleanup());
  }
}

export default MElevatorManager;
