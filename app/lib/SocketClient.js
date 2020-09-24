import TcpSocket from 'react-native-tcp-socket';
import {Alert} from 'react-native';
import AppEnv from '../config/env';

let socket_client = null;
const HOST = AppEnv.SOCKET_ENDPOINT;
const PORT = AppEnv.SOCKET_PORT;

const LIFE_TIME = 90000;

if (!Array.prototype.remove) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.remove = function (val) {
    return val > -1 ? this.splice(val, 1) : [];
  };
}
if (!Array.prototype.removeObject) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.removeObject = function (value) {
    let val = -1;
    for (let i = 0; i < this.length; i++) {
      if (this[i] === value) {
        val = i;
        break;
      }
    }
    return val > -1 ? this.splice(val, 1) : [];
  };
}
if (!Array.prototype.clear) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.clear = function () {
    while (this.length) {
      this.pop();
    }
  };
}

if (!Array.prototype.contain) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.contain = function (value) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] === value) {
        return true;
      }
    }
    return false;
  };
}

function Utf8ArrayToStr(array) {
  let out, i, len, c;
  let char2, char3;

  out = '';
  len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    // eslint-disable-next-line no-bitwise
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        // eslint-disable-next-line no-bitwise
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(
          // eslint-disable-next-line no-bitwise
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0),
        );
        break;
    }
  }
  return out;
}

class SocketClient {
  constructor() {
    this.socket = null;
    this.count = 0;
    this.callbacksAUTO = {};
    this.callbacks = [];
    this.isConnected = false;
    this.commandBuffer = '';
    this.onConnected = null;
    this.firstConnect = true;
    this.mapCallbacks = {};
  }

  disconnect() {
    if (this.socket) {
      this.socket.destroy();
    }
  }

  connect(onConnected, onError, onClose) {
    const options = {
      port: PORT,
      host: HOST,
    };
    if (this.socket && this.socket.destroy) {
      this.socket.destroy();
      this.socket = null;
    }
    this.socket = TcpSocket.createConnection(options);
    this.socket.on('connect', () => {
      this.socket.setKeepAlive(true);
      console.log('Socket connected', HOST, PORT);
      if (!this.isConnected) {
        this.isConnected = true;
        if (this.onConnected !== null) {
          this.onConnected(true);
        }
      }
      this.isConnected = true;
      if (onConnected) {
        onConnected();
      }
    });
    this.socket.on('data', (data) => {
      this.onReceiveData(data);
    });
    this.socket.on('close', () => {
      console.log('Socket close');
      if (this.isConnected || this.firstConnect) {
        for (let i = 0; i < this.callbacks.length; i++) {
          clearTimeout(this.callbacks[i].timer);
        }
        this.callbacks = [];
        this.commandBuffer = '';
        this.count = 0;
        this.callbacksAUTO = {};
        if (this.onConnected !== null) {
          this.onConnected(false);
        }
      }
      this.isConnected = false;
      this.firstConnect = false;
      //this.connect();
      if (onClose) {
        onClose();
      }
    });
    this.socket.on('error', () => {
      console.log('retry connecting...');
      if (this.isConnected || this.firstConnect) {
        for (let i = 0; i < this.callbacks.length; i++) {
          clearTimeout(this.callbacks[i].timer);
        }
        this.callbacks = [];
        this.commandBuffer = '';
        this.callbacksAUTO = {};
        if (this.onConnected !== null) {
          this.onConnected(false);
        }
      }
      this.firstConnect = false;
      this.isConnected = false;
      if (onError) {
        onError();
      }
    });
  }

  send(place, key, data, callback) {
    if (!this.isConnected) {
      if (callback !== null) {
        Alert.alert(null, 'Now is disconnected !!!', [{text: 'OK'}]);
        callback({err: 'dis'});
      }
      return;
    }
    try {
      this.socket.write(data);
    } catch (err) {
      console.log(err);
    }

    if (key !== null && callback !== null) {
      this.callbacks.push({
        key: key,
        callback: callback,
        place: place,
        timer: setTimeout(
          (key) => {
            this.removeCallback(key, true);
            console.log('TimeOut = ' + key);
          },
          LIFE_TIME,
          key,
        ),
      });

      if (this.mapCallbacks[place] === undefined) {
        this.mapCallbacks[place] = [];
      }
      this.mapCallbacks[place].push(key);
    }

    console.log('Send : ' + data + ' :: callback = =' + this.callbacks.length);
  }

  setOnConnectedCallback(callback) {
    this.onConnected = callback;
  }

  onCallback(key, data) {
    if (!key) {
      return false;
    }

    if (data.act) {
      data.err = 'act';
    }

    let index = -1;
    for (index = this.callbacks.length - 1; index >= 0; --index) {
      if (this.callbacks[index].key === key) {
        break;
      }
    }
    if (index >= 0) {
      this.mapCallbacks[this.callbacks[index].place].removeObject(
        this.callbacks[index].key,
      );
      if (this.mapCallbacks[this.callbacks[index].place].length === 0) {
        delete this.mapCallbacks[this.callbacks[index].place];
      }
      this.callbacks[index].callback(data);
      clearTimeout(this.callbacks[index].timer);
      this.callbacks.remove(index);
      return true;
    }

    return false;
  }

  removeCallback(key, invoke) {
    if (!key) {
      return false;
    }
    let index = -1;
    for (index = this.callbacks.length - 1; index >= 0; --index) {
      if (this.callbacks[index].key === key) {
        break;
      }
    }
    if (index >= 0) {
      if (invoke) {
        this.callbacks[index].callback({err: 'timeout'});
      } else {
        clearTimeout(this.callbacks[index].timer);
      }
      if (this.mapCallbacks[this.callbacks[index].place]) {
        this.mapCallbacks[this.callbacks[index].place].removeObject(
          this.callbacks[index].key,
        );
        if (this.mapCallbacks[this.callbacks[index].place].length === 0) {
          delete this.mapCallbacks[this.callbacks[index].place];
        }
      }

      this.callbacks.remove(index);
      return true;
    }

    return false;
  }

  processCommand(command) {
    let idx = command.indexOf('{');
    if (idx < 0) {
      console.log('Command tra ve sai!!!');
      return;
    }
    let cmd = command.slice(0, idx);
    command = command.slice(idx);
    let json = null;
    try {
      command = command.replace(/\\/g, '&#92;');
      json = JSON.parse(command);
    } catch (e) {
      console.log(e);
      //console.log('ERROR::::command = '  + command);
      return;
    }

    if (!this.onCallback(json.cmdkey, json)) {
      if (this.callbacksAUTO[cmd]) {
        for (let i = 0; i < this.callbacksAUTO[cmd].length; i++) {
          this.callbacksAUTO[cmd][i](json);
        }
      }
    }
  }

  addCMDListener(cmd, callback) {
    if (callback) {
      if (this.callbacksAUTO[cmd] === undefined) {
        this.callbacksAUTO[cmd] = [];
      }
      this.callbacksAUTO[cmd].push(callback);
    }
  }

  removeCMDListener(cmd, key) {
    if (this.callbacksAUTO[cmd]) {
      if (!key) {
        this.callbacksAUTO[cmd] = [];
      } else {
        for (let i = 0; i < this.callbacksAUTO[cmd].length; i++) {
          if (this.callbacksAUTO[cmd][i].key === key) {
            this.callbacksAUTO[cmd].remove(i);
            return;
          }
        }
      }
    }
  }

  sendCommandStringDontCmdKey(cmdId, data) {
    return this.sendCommandStringInPlace(
      'sendCommandStringDontCmdKey',
      cmdId,
      data,
      null,
      true,
    );
  }

  sendCommandStringInPlace(place, cmdId, data, callback, dontCmdKey) {
    // console.log('sendCommandString ' + place + '::' + cmdId + '::' + data + '::' + callback);
    let sSend = cmdId;
    if (data === null) {
      data = {};
    }

    if (dontCmdKey === null || dontCmdKey === false) {
      this.count++;
      if (this.count > 10000) {
        this.count = 0;
      }
      let key = String(new Date().getTime()) + '_' + String(this.count);
      data.cmdkey = key;

      sSend += JSON.stringify(data);
      sSend += '$end';
      console.log(sSend);
      this.send(place, key, sSend, callback);

      return key;
    }
    sSend += JSON.stringify(data);
    sSend += '$end';
    console.log(sSend);
    this.send(place, null, sSend, null);
    return null;
  }

  receivedString(str) {
    //if(DEBUG)
    //console.log('Receive : ' + str + ' :: callbacks = ' + this.callbacks.length );
    this.commandBuffer += str;
    //Process receive String
    let commands = this.commandBuffer.split('$end');
    if (commands.length > 0) {
      this.commandBuffer = commands[commands.length - 1];
    }
    for (let i = 0; i < commands.length - 1; i++) {
      this.processCommand(commands[i]);
    }
  }

  onReceiveData(data) {
    let string = Utf8ArrayToStr(data);
    //var string = DecoderArrayToString(data)
    this.receivedString(string);
  }

  static getInstance() {
    if (socket_client === null) {
      socket_client = new SocketClient();
    }
    return socket_client;
  }

  setNull() {
    socket_client = null;
  }
}

export default SocketClient;
