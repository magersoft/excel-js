import { storage } from '@core/utils';

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return new Promise(resolve => {
      const state = storage(this.name);
      setTimeout(() => {
        resolve(state);
      }, 1500);
    });
  }
}

function storageName(param) {
  return 'excel:' + param;
}
