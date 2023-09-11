import MElevator from '../../store/models/MElevator';
import ElevatorCabin from '../ElevatorCabin/ElevatorCabin';
import { ElevatorShaftContainer } from './ElevatorShaft.styles';

type ElevatorShaftProps = {
  elevator: MElevator;
  floorHeight: number;
};

function ElevatorShaft({ elevator, floorHeight }: ElevatorShaftProps) {
  return (
    <ElevatorShaftContainer>
      <ElevatorCabin height={floorHeight} elevator={elevator} />
    </ElevatorShaftContainer>
  );
}

export default ElevatorShaft;
