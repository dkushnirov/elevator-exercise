import { ReactNode } from 'react';
import Portal from '../Portal/Portal';
import { CloseButton, ModalContent, ModalOverlay } from './Modal.styles';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  testId: string;
  onClose: () => void;
};

function Modal({ isOpen, testId, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <ModalOverlay onClick={onClose} data-testid={testId}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {children}
          <CloseButton onClick={onClose}>✖</CloseButton>
        </ModalContent>
      </ModalOverlay>
    </Portal>
  );
}

export default Modal;
