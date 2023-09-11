import styled from 'styled-components';

export const ElevatorShaftContainer = styled.div`
  width: 60px;
  height: 100%;
  border-left: 2px dashed ${({ theme: { colors } }) => colors.gray3};
  border-right: 2px dashed ${({ theme: { colors } }) => colors.gray3};
  position: relative;
  margin: 0 4px;
`;
