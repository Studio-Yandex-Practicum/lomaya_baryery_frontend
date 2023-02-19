import { createEvent, forward } from 'effector';
import { participantsModel } from '../../entities/participant';

const mount = createEvent<string>();
const unmount = createEvent();

forward({
  from: mount,
  to: participantsModel.getParticipantsFx,
});

forward({
  from: unmount,
  to: participantsModel.clear,
});

export const events = { mount, unmount };
