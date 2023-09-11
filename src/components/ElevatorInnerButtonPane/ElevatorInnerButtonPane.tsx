import ElevatorButton from '../ElevatorButton/ElevatorButton';
import { ElevatorInnerButtonPaneContainer } from './ElevatorInnerButtonPane.styles';

type ElevatorInnerButtonPaneProps = {
  numberOfFloors: number;
  onChange: (targetFloor: number) => void;
};

function calculateColumns(itemCount: number): number | string {
  if (itemCount < 10) return 1;
  if (itemCount < 25) return 2;
  return 'auto-fill';
}

function ElevatorInnerButtonPane({
  numberOfFloors,
  onChange,
}: ElevatorInnerButtonPaneProps) {
  const generateButtons = () => {
    const buttons = [];
    for (let i = numberOfFloors; i > 0; i--) {
      const button = (
        <ElevatorButton
          key={`section-${i.toString()}`}
          floorNumber={i}
          isActive={false}
          onChange={onChange}
        />
      );
      buttons.push(button);
    }
    return buttons;
  };
  return (
    <ElevatorInnerButtonPaneContainer
      columns={calculateColumns(numberOfFloors)}
    >
      {generateButtons()}
    </ElevatorInnerButtonPaneContainer>
  );
}

export default ElevatorInnerButtonPane;
