import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useMeasure } from 'react-use';
import MultiStoryBuilding from '../MultiStoryBuilding/MultiStoryBuilding';
import ElevatorShaft from '../ElevatorShaft/ElevatorShaft';
import elevatorManagerStore from '../../store/elevatorManagerStore';
import ElevatorCallButtonPanel from '../ElevatorCallButtonPanel/ElevatorCallButtonPanel';
import {
  BuildingOptions,
  ElevatorManagerContainer,
  ElevatorManagerWrapper,
  ElevatorsContainer,
} from './ElevatorManagerView.styles';
import { BuildingFormData } from '../../types/building';
import Modal from '../../sharedComponents/Modal/Modal';
import BuildingForm from '../BuildingForm/BuildingForm';
import Button from '../../sharedComponents/Button/Button';

const FLOOR_HEIGHT = 56;

const initialBuildingData = {
  buildingName: 'Building No 7',
  numberOfFloors: 10,
  numberOfElevators: 2,
};

function ElevatorManagerView() {
  const [containerRef, { width: componentWidth }] =
    useMeasure<HTMLDivElement>();
  const [showBuildingModal, setShowBuildingModal] = useState(false);
  const [buildingData, setBuildingData] =
    useState<BuildingFormData>(initialBuildingData);

  const handlerBuildingModalShow = () => {
    setShowBuildingModal(true);
  };

  const handlerBuildingModalClose = () => {
    setShowBuildingModal(false);
  };

  const handlerBuildingDataUpdate = (data: BuildingFormData) => {
    setBuildingData(data);
    setShowBuildingModal(false);
  };

  useEffect(() => {
    elevatorManagerStore.createElevatorManager(
      buildingData.numberOfFloors,
      buildingData.numberOfElevators
    );

    return () => {
      elevatorManagerStore.cleanup();
    };
  }, [buildingData.numberOfFloors, buildingData.numberOfElevators]);

  if (!elevatorManagerStore.elevatorManager) {
    return null;
  }

  const callElevator = (item: number) => {
    elevatorManagerStore.elevatorManager?.addToElevatorQueue(item);
  };

  const numberOfFloors =
    elevatorManagerStore.elevatorManager.getNumberOfFloors();
  const elevators = elevatorManagerStore.elevatorManager.getElevators();
  const elevatorQueue = elevatorManagerStore.elevatorManager.getElevatorQueue();

  return (
    <ElevatorManagerContainer ref={containerRef}>
      <BuildingOptions>
        <Button
          type="button"
          onClick={handlerBuildingModalShow}
          variant="primary"
        >
          Building Options
        </Button>
      </BuildingOptions>
      <ElevatorManagerWrapper key={Object.values(buildingData).join('-')}>
        <MultiStoryBuilding
          floors={numberOfFloors}
          floorHeight={FLOOR_HEIGHT}
          floorWidth={componentWidth}
          numberOfElevators={elevators.length}
        />
        <ElevatorsContainer className="elevators">
          {elevators.map((elevator) => (
            <ElevatorShaft
              key={`elevator-shaft-${elevator.id}`}
              elevator={elevator}
              floorHeight={FLOOR_HEIGHT}
            />
          ))}
          <ElevatorCallButtonPanel
            numberOfFloors={numberOfFloors}
            elevatorQueue={elevatorQueue}
            onChange={callElevator}
          />
        </ElevatorsContainer>
      </ElevatorManagerWrapper>
      <Modal
        isOpen={showBuildingModal}
        testId="building-modal"
        onClose={handlerBuildingModalClose}
      >
        <BuildingForm
          defaultData={buildingData}
          onSubmit={handlerBuildingDataUpdate}
        />
      </Modal>
    </ElevatorManagerContainer>
  );
}

export default observer(ElevatorManagerView);
