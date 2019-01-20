import {ignoreLoading} from '@/utils/Loading';
import {Loading} from 'element-ui';

let loadingInstance = null;
let loadingCounter = 0;

export function loadingFlux(config) {
  if (!ignoreLoading(config.url)) {
    loadingInstance = Loading.service({
      text: 'Loading...',
    });
    loadingCounter++;
  }
}

export function loadingReflux(response) {
  if (!ignoreLoading(response.request.responseURL)) {
    loadingCounter--;
  }

  if (loadingCounter === 0 && loadingInstance) {
    loadingInstance.close();
  }
}