import { createEvent, forward } from 'effector';
import { participantsModel } from '../../entities/participant';

export const mount = createEvent<string>();
export const unmount = createEvent();

forward({
  from: mount,
  to: participantsModel.getParticipantsFx,
});

forward({
  from: unmount,
  to: participantsModel.clear,
});
