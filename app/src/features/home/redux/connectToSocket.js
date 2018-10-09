import { takeLatest, eventChannel } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';
import {
  HOME_CONNECT_TO_SOCKET_BEGIN,
  HOME_CONNECT_TO_SOCKET_SUCCESS,
  HOME_CONNECT_TO_SOCKET_FAILURE,
  HOME_CONNECT_TO_SOCKET_DISMISS_ERROR,
} from './constants';
import { updateDirData } from '../../directories-list/redux/actions';
import { updateTemplatesList } from '../../template-select/redux/actions';
import io from 'socket.io-client';

export function connectToSocket() {
  // If need to pass args to saga, pass it with the begin action.
  return {
    type: HOME_CONNECT_TO_SOCKET_BEGIN,
  };
}

export function dismissConnectToSocketError() {
  return {
    type: HOME_CONNECT_TO_SOCKET_DISMISS_ERROR,
  };
}

export function connect() {
  var socket = io.connect('http://localhost:9967');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

export function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('get_files_list_result', data => {
      emit(updateDirData(data.path, data.files));
    });
    socket.on('make_from_template_result', data => {
      socket.emit('get_files_list', data.directionDir);
    });
    socket.on('get_templates_list_result', data => {
      emit(updateTemplatesList(data));
    });
    return () => {};
  });
}

export function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

// worker Saga: will be fired on HOME_CONNECT_TO_SOCKET_BEGIN actions
export function* doConnectToSocket() {
  // If necessary, use argument to receive the begin action with parameters.
  let res;
  try {
    // Do Ajax call or other async request here. delay(20) is just a placeholder.
    res = yield call(connect);
  } catch (err) {
    yield put({
      type: HOME_CONNECT_TO_SOCKET_FAILURE,
      data: { error: err },
    });
    return;
  }
  // Dispatch success action out of try/catch so that render errors are not catched.
  yield put({
    type: HOME_CONNECT_TO_SOCKET_SUCCESS,
    data: res,
  });
  yield fork(read, res);
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchConnectToSocket() {
  yield takeLatest(HOME_CONNECT_TO_SOCKET_BEGIN, doConnectToSocket);
}

// Redux reducer
export function reducer(state, action) {
  switch (action.type) {
    case HOME_CONNECT_TO_SOCKET_BEGIN:
      return {
        ...state,
        connectToSocketPending: true,
        connectToSocketError: null,
      };

    case HOME_CONNECT_TO_SOCKET_SUCCESS:
      return {
        ...state,
        connectToSocketPending: false,
        connectToSocketError: null,
        socket: action.data,
      };

    case HOME_CONNECT_TO_SOCKET_FAILURE:
      return {
        ...state,
        connectToSocketPending: false,
        connectToSocketError: action.data.error,
      };

    case HOME_CONNECT_TO_SOCKET_DISMISS_ERROR:
      return {
        ...state,
        connectToSocketError: null,
      };

    default:
      return state;
  }
}
