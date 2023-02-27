import { useStore } from 'effector-react';
import { viewerModel, ViewerProfile } from 'entities/viewer';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import styles from './styles.module.css';

export function PageViewerProfile() {
  const viewer = useStore(viewerModel.$viewer);

  if (!viewer) {
    return null;
  }

  return (
    <ContentContainer extClassName={styles.container}>
      <ContentHeading title="Профиль" />
      <ViewerProfile extClassName={styles.viewerProfile} viewerData={viewer} />
    </ContentContainer>
  );
}
