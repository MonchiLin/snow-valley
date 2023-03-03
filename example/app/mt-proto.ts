import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ID, API_HASH } from '@env';
import MTProto from '@mtproto/core/envs/browser';
import Transport from '@mtproto/core/envs/browser/transport';
import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';
import { TextEncoder, TextDecoder } from 'text-encoding';
import jsSHA from 'jssha';
import * as sha256 from 'fast-sha256';

polyfillGlobal('TextEncoder', () => TextEncoder);
polyfillGlobal('TextDecoder', () => TextDecoder);

function getRandomBytes(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

class CustomStorage {
  set(key, value) {
    return AsyncStorage.setItem(key, value);
  }

  get(key) {
    return AsyncStorage.getItem(key);
  }
}

async function SHA1(data) {
  const format = data instanceof Uint8Array ? 'UINT8ARRAY' : 'ARRAYBUFFER';
  const digest = new jsSHA('SHA-1', format);
  digest.update(data);
  return digest.getHash('UINT8ARRAY');
}

async function SHA256(data) {
  const format = data instanceof Uint8Array ? 'UINT8ARRAY' : 'ARRAYBUFFER';
  const digest = new jsSHA('SHA-256', format);
  digest.update(data);
  return digest.getHash('UINT8ARRAY');
}

async function PBKDF2(password, salt, iterations) {
  return sha256.pbkdf2(password, salt, iterations, 512);
}

export const mtprotoApp = new MTProto({
  api_id: API_ID,
  api_hash: API_HASH,
  storageOptions: {
    instance: new CustomStorage(),
  },
  getRandomBytes: getRandomBytes,
  createTransport: (dc, crypto) => {
    return new Transport(dc, crypto);
  },
  SHA1,
  SHA256,
  PBKDF2,
});
