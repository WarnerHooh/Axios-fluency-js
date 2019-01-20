import {RequestOptions} from './FluentHttp';

const POLLING = '_polling';

export default function (enable = true, polling = POLLING) {
  if (!enable) {
    return RequestOptions({params: {[polling]: 'true'}});
  }

  return function (target, method, descriptor) {
    return descriptor;
  };
};

export function ignoreLoading(url = '') {
  const regExp = new RegExp(`(\\?|&)${POLLING}=true`);
  return regExp.test(url);
}