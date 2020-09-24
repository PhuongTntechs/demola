import createReducer from '../../lib/createReducer';

const testInitialState = {};

export const testReducer = createReducer(testInitialState, {
  ['TEST_DUMMY']() {
    return testInitialState;
  },
});
