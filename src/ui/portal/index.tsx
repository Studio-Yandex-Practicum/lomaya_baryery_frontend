import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type TPortalProps = React.PropsWithChildren;

export function Portal({ children }: TPortalProps) {
  const [container] = useState(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []); // eslint-disable-line

  return createPortal(children, container);
}
