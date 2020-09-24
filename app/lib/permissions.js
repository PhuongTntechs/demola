import store from '../store';

export default function () {
  return store.getState().AuthReducer.token ?? null;
}

export function canDeleteComment() {
  const user = store.getState().AuthReducer.user ?? {};
  return user.permissions && user.permissions.includes('deleteComment');
}

export function canAcceptComment() {
  const user = store.getState().AuthReducer.user ?? {};
  return user.permissions && user.permissions.includes('acceptComment');
}
