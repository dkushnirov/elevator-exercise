import ElevatorButton from '../ElevatorButton/ElevatorButton';
import { ElevatorCallButtonContainer } from './ElevatorCallButtonPanel.styles';

type ElevatorCallButtonPanelProps = {
  numberOfFloors: number;
  elevatorQueue: number[];
  onChange: (targetFloor: number) => void;
};

function ElevatorCallButtonPanel({
  numberOfFloors,
  elevatorQueue,
  onChange,
}: ElevatorCallButtonPanelProps) {
  const generateButtons = () => {
    const buttons = [];
    for (let i = numberOfFloors; i > 0; i--) {
      const button = (
        <ElevatorButton
          key={`section-${i.toString()}`}
          floorNumber={i}
          isActive={elevatorQueue.indexOf(i) > -1}
          onChange={onChange}
        />
      );
      buttons.push(button);
    }
    return buttons;
  };
  return (
    <ElevatorCallButtonContainer>
      {generateButtons()}
    </ElevatorCallButtonContainer>
  );
}

export default ElevatorCallButtonPanel;
