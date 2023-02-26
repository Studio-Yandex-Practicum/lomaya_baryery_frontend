import React from 'react';
import cn from 'classnames';
import { Button } from 'shared/ui-kit/button';
import styles from './styles.module.css';

interface InviteAdminButtonProps {
  extClassName?: string;
  children?: React.ReactElement;
}

export function InviteAdminButton({
  extClassName,
  children,
}: InviteAdminButtonProps) {
  return (
    <>
      <Button
        htmlType="button"
        size="small"
        type="primary"
        extClassName={cn(extClassName, styles.button)}
      >
        Пригласить
      </Button>
      {children}
    </>
  );
}
