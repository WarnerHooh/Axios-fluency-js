import {Headers} from './ElegantHttp';

const LOADING = 'X-LOADING';

export default function (enable = true) {
  if (!enable) {
    return Headers({[LOADING]: false});
  }

  return function (target, method, descriptor) {
    return descriptor;
  };
};

export function ignoreLoading(config) {
  return config.headers[LOADING] === false
}