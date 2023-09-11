import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const InputLabel = styled.label`
  padding-right: 8px;
  font-size: 16px;
`;

export const Input = styled.input`
  width: 160px;
  padding: 8px;
`;

export const ErrorMessage = styled.div`
  color: red;
  height: 36px;
  font-size: 12px;
  margin-top: 4px;
  line-height: 1;
  margin-bottom: 8px;
`;
