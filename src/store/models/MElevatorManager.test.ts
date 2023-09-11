import MElevatorManager from './MElevatorManager';

describe('MElevatorManager', () => {
  let elevatorManager: MElevatorManager;

  beforeEach(() => {
    elevatorManager = new MElevatorManager(10, 3);
  });

  afterEach(() => {
    elevatorManager.cleanup();
  });

  it('should initialize with default values', () => {
    expect(elevatorManager.getNumberOfFloors()).toBe(10);
    expect(elevatorManager.getNumberOfElevators()).toBe(3);
    expect(elevatorManager.getElevatorQueue()).toEqual([]);
    expect(elevatorManager.getElevators()).toHaveLength(3);
  });

  it('should add floors to elevator queue', () => {
    elevatorManager.addToElevatorQueue(5);
    elevatorManager.addToElevatorQueue(7);
    expect(elevatorManager.getElevatorQueue()).toEqual([5, 7]);
  });

  it('should remove floors from elevator queue when completed', () => {
    elevatorManager.addToElevatorQueue(5);
    elevatorManager.handlerCallElevatorComplete(5);
    expect(elevatorManager.getElevatorQueue()).toEqual([]);
  });

  /**
   * Example 1: A person calls the elevator on floor 7, and it is moving.
   * Elevator number 1 starts moving and is now passing floor 2.
   * Another person calls the elevator on floor 5,
   * but since elevator 1 needs to arrive at floor 7 first, elevator 2 starts moving.
   */
  it('should call nearest available elevator when a person calls (Example 1)', () => {
    const [elevator1, elevator2] = elevatorManager.getElevators();
    // A person on floor 7 calls the elevator
    elevatorManager.addToElevatorQueue(7);

    // Now, elevator 1 should start moving since it's not busy
    expect(elevator1.getCurrentFloor()).toBe(7);

    // Another person on floor 5 calls the elevator
    elevatorManager.addToElevatorQueue(5);

    // Elevator 1 is still moving to floor 7, so elevator 2 should start moving to floor 5
    expect(elevator2.getCurrentFloor()).toBe(5);
  });

  /**
   * Example 2:
   * A person calls the elevator on floor 7, and elevator number 1 has now stopped at floor 7.
   * Another person calls the elevator on floor 5. In this case, elevator number 1 is closer to the person,
   * and they will be picked up from floor 5.
   */

  it('should call nearest available elevator when a person calls (Example 1)', () => {
    const [elevator1, elevator2] = elevatorManager.getElevators();
    // A person on floor 7 calls the elevator
    elevatorManager.addToElevatorQueue(7);

    // Now, elevator 1 should start moving since it's not busy
    expect(elevator1.getCurrentFloor()).toBe(7);

    // synthetic move completion
    elevator1.cancelCallElevator();

    // Another person on floor 5 calls the elevator
    elevatorManager.addToElevatorQueue(5);

    // Elevator 1 should start moving to floor 5
    expect(elevator1.getCurrentFloor()).toBe(5);
    // Elevator 1 should be on floor 1
    expect(elevator2.getCurrentFloor()).toBe(1);
  });
});
