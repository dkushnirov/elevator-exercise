import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  position: relative;
  background: ${({ theme: { colors } }) => colors.gray8};
  border-radius: 5px;
  padding: 20px;
  max-width: 400px;
  @media (max-width: 768px) {
    max-width: 100%;
    height: 100vh;
    width: 100vw;
    padding: 1rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 0;
  width: 36px;
  height: 36px;
  background-color: ${({ theme: { colors } }) => colors.gray4};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  color: white;
`;
