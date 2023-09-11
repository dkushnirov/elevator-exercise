import MElevator from './MElevator';

describe('MElevator', () => {
  let elevator: MElevator;

  beforeEach(() => {
    elevator = new MElevator(10, 1, vi.fn(), vi.fn());
  });

  afterEach(() => {
    elevator.cleanup();
  });

  it('should initialize with default values', () => {
    expect(elevator.getCurrentFloor()).toBe(1);
    expect(elevator.getNumberOfFloors()).toBe(10);
    expect(elevator.areDoorsOpen).toBe(false);
    expect(elevator.isBusy).toBe(false);
  });

  it('should open doors when called', () => {
    elevator.callElevator(1);
    expect(elevator.areDoorsOpen).toBe(true);
  });

  it('should close doors when canceled', () => {
    elevator.callElevator(1);
    elevator.cancelCallElevator();
    expect(elevator.areDoorsOpen).toBe(false);
  });

  it('should update current floor when called', () => {
    elevator.callElevator(5);
    expect(elevator.getCurrentFloor()).toBe(5);
  });
});
