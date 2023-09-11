import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type ElevatorButtonProps = {
  floorNumber: number;
  isActive: boolean;
  onChange: (targetFloor: number) => void;
};

export type ElevatorButtonContainerProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    selected: boolean;
  };

const ElevatorButtonContainer = styled.button<ElevatorButtonContainerProps>`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 2px solid
    ${({ selected, theme: { colors } }) =>
      selected ? colors.primary : colors.gray5};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${({ selected, theme: { colors } }) =>
    selected ? colors.white : colors.gray5};
  cursor: pointer;
  &:hover {
    color: ${({ theme: { colors } }) => colors.white};
    background-color: ${({ theme: { colors } }) => colors.gray5};
  }
`;

function ElevatorButton({
  floorNumber,
  isActive,
  onChange,
}: ElevatorButtonProps) {
  const handleClick = () => {
    onChange(floorNumber);
  };

  return (
    <ElevatorButtonContainer
      selected={isActive}
      disabled={isActive}
      onClick={handleClick}
    >
      {floorNumber}
    </ElevatorButtonContainer>
  );
}

export default ElevatorButton;
