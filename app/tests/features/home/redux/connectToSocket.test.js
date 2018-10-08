import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_CONNECT_TO_SOCKET_BEGIN,
  HOME_CONNECT_TO_SOCKET_SUCCESS,
  HOME_CONNECT_TO_SOCKET_FAILURE,
  HOME_CONNECT_TO_SOCKET_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  connectToSocket,
  dismissConnectToSocketError,
  doConnectToSocket,
  reducer,
} from 'src/features/home/redux/connectToSocket';

describe('home/redux/connectToSocket', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by connectToSocket', () => {
    expect(connectToSocket()).to.have.property('type', HOME_CONNECT_TO_SOCKET_BEGIN);
  });

  it('returns correct action by dismissConnectToSocketError', () => {
    expect(dismissConnectToSocketError()).to.have.property('type', HOME_CONNECT_TO_SOCKET_DISMISS_ERROR);
  });

  // saga tests
  const generator = doConnectToSocket();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches HOME_CONNECT_TO_SOCKET_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: HOME_CONNECT_TO_SOCKET_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches HOME_CONNECT_TO_SOCKET_FAILURE action when failed', () => {
    const generatorForError = doConnectToSocket();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: HOME_CONNECT_TO_SOCKET_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type HOME_CONNECT_TO_SOCKET_BEGIN correctly', () => {
    const prevState = { connectToSocketPending: false };
    const state = reducer(
      prevState,
      { type: HOME_CONNECT_TO_SOCKET_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.connectToSocketPending).to.be.true;
  });

  it('handles action type HOME_CONNECT_TO_SOCKET_SUCCESS correctly', () => {
    const prevState = { connectToSocketPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CONNECT_TO_SOCKET_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.connectToSocketPending).to.be.false;
  });

  it('handles action type HOME_CONNECT_TO_SOCKET_FAILURE correctly', () => {
    const prevState = { connectToSocketPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CONNECT_TO_SOCKET_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.connectToSocketPending).to.be.false;
    expect(state.connectToSocketError).to.exist;
  });

  it('handles action type HOME_CONNECT_TO_SOCKET_DISMISS_ERROR correctly', () => {
    const prevState = { connectToSocketError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_CONNECT_TO_SOCKET_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.connectToSocketError).to.be.null;
  });
});