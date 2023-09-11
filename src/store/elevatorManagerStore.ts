import { makeAutoObservable } from 'mobx';
import MElevatorManager from './models/MElevatorManager';

class ElevatorManagerStore {
  elevatorManager: MElevatorManager | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createElevatorManager(numberOfFloors: number, numberOfElevators: number) {
    this.elevatorManager = new MElevatorManager(
      numberOfFloors,
      numberOfElevators
    );
  }

  cleanup() {
    this.elevatorManager?.cleanup();
    this.elevatorManager = null;
  }
}

const elevatorManagerStore = new ElevatorManagerStore();

export default elevatorManagerStore;
