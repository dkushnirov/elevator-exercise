import { render, fireEvent } from '../../utils/test-utils';
import ElevatorManagerView from './ElevatorManagerView';

describe('AElevatorManagerView', () => {
  it('handles modal show, close', () => {
    const { getByText, getByTestId } = render(<ElevatorManagerView />);
    const buildingOptionsButton = getByText('Building Options');
    fireEvent.click(buildingOptionsButton);

    const buildingModal = getByTestId('building-modal');
    expect(buildingModal).toBeInTheDocument();

    const closeButton = getByText('✖');
    fireEvent.click(closeButton);
    expect(buildingModal).not.toBeInTheDocument();
  });
});
