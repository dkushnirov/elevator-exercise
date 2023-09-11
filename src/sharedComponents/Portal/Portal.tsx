import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

type PortalProps = {
  children: ReactNode;
};

function Portal({ children }: PortalProps) {
  const portalRoot = document.getElementById('modal-root') as HTMLElement;

  const portalElement = document.createElement('div');

  useEffect(() => {
    portalRoot.appendChild(portalElement);

    return () => {
      portalRoot.removeChild(portalElement);
    };
  }, [portalElement, portalRoot]);

  return createPortal(children, portalElement);
}

export default Portal;
