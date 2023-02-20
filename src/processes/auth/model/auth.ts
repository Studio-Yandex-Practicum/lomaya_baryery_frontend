import { createEvent, createStore } from 'effector';

export const $isAuth = createStore(true);

export const setAuth = createEvent<boolean>();

$isAuth.on(setAuth, (_, isAuth) => isAuth);