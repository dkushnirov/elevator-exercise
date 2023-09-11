import styled from 'styled-components';

type DoorProps = {
  open: boolean;
};

type ElevatorCabinProps = {
  height: number;
};

export const ElevatorCabinContainer = styled.div<ElevatorCabinProps>`
  position: relative;
  top: 100%;
  width: 100%;
  overflow: hidden;
  transition: transform 1s ease-in-out;
  transform: translateY(-100%);
  height: ${(props) => props.height}px;
`;

export const ElevatorDoors = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  &::before {
    position: absolute;
    content: '[->';
    font-size: 32px;
    left: 0;
    right: 0;
    text-align: center;
    color: ${({ theme: { colors } }) => colors.secondary};
    border: 2px solid ${({ theme: { colors } }) => colors.secondary};
    cursor: pointer;
  }
`;

export const LeftDoor = styled.div<DoorProps>`
  width: 50%;
  height: 100%;
  background-color: ${({ theme: { colors } }) => colors.gray6};
  border: 1px solid ${({ theme: { colors } }) => colors.gray9};
  transform: translateX(0);

  ${({ open }) =>
    open &&
    `
      transform: translateX(-100%);
    `}
`;

export const RightDoor = styled.div<DoorProps>`
  width: 50%;
  height: 100%;
  background-color: ${({ theme: { colors } }) => colors.gray6};
  border: 1px solid ${({ theme: { colors } }) => colors.gray9};
  transform: translateX(0);
  ${({ open }) =>
    open &&
    `
      transform: translateX(100%);
    `}
`;
