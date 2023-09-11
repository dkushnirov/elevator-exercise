import styled from 'styled-components';

export type ElevatorInnerButtonPaneContainerProps = {
  columns: number | string;
};

export const ElevatorInnerButtonPaneContainer = styled.div<ElevatorInnerButtonPaneContainerProps>`
  display: grid;
  max-height: 80vh;
  min-width: 300px;
  padding: 48px 32px 24px;
  grid-template-columns: repeat(${(props) => props.columns}, minmax(40px, 1fr));
  gap: 5px;
  justify-items: center;
`;
