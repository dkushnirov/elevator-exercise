import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import MElevator from '../../store/models/MElevator';
import elevatorSound from '../../assets/audio/elevator.mp3';

import {
  ElevatorCabinContainer,
  ElevatorDoors,
  LeftDoor,
  RightDoor,
} from './ElevatorCabin.styles';
import Modal from '../../sharedComponents/Modal/Modal';
import ElevatorInnerButtonPane from '../ElevatorInnerButtonPane/ElevatorInnerButtonPane';

type ElevatorShaftProps = {
  elevator: MElevator;
  height: number;
};

function ElevatorCabin({ elevator, height }: ElevatorShaftProps) {
  const [showModal, setShowModal] = useState(false);

  const elevatorRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlerDoorsClick = () => {
    if (!elevator.areDoorsOpen) return;
    elevator.holdElevator();
    setShowModal(true);
  };

  const handlerDoorsClose = () => {
    setShowModal(false);
    elevator.cancelCallElevator();
  };

  const handlerElevatorButtonClick = (targetFloor: number) => {
    setShowModal(false);
    elevator.callElevator(targetFloor);
  };

  return (
    <ElevatorCabinContainer
      ref={(elevatorCabinElement) => {
        elevatorRef.current = elevatorCabinElement;
        elevator.setElevatorCabinElement(elevatorCabinElement ?? null);
      }}
      height={height}
    >
      <ElevatorDoors onClick={handlerDoorsClick}>
        <LeftDoor open={elevator.areDoorsOpen} />
        <RightDoor open={elevator.areDoorsOpen} />
      </ElevatorDoors>
      <audio
        ref={(audioElement) => {
          audioRef.current = audioElement;
          elevator.setAudioElement(audioElement ?? null);
        }}
      >
        <source src={elevatorSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Modal
        isOpen={showModal}
        testId="elevator-button-pane-modal"
        onClose={handlerDoorsClose}
      >
        <ElevatorInnerButtonPane
          numberOfFloors={elevator.getNumberOfFloors()}
          onChange={handlerElevatorButtonClick}
        />
      </Modal>
    </ElevatorCabinContainer>
  );
}

export default observer(ElevatorCabin);
