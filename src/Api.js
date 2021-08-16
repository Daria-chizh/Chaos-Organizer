export default class Api {
  static makeCall(options, cb) {
    const {
      method, path, qs, body, form,
    } = options;

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const responseType = xhr.getResponseHeader('content-type');
        if (responseType && responseType.includes('application/json')) {
          cb(JSON.parse(xhr.responseText));
        } else {
          cb(xhr.responseText);
        }
      }
    });

    const host = 'http://localhost:7777';
    const url = `${host}/${path}${qs ? `?${qs}` : ''}`;

    xhr.open(method, url);
    if (method !== 'GET') {
      if (body) {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(body));
      } else if (form) {
        xhr.send(form);
      } else {
        xhr.send();
      }
    } else {
      xhr.send();
    }
  }

  static listMedia(fromId, cb) {
    this.makeCall({ method: 'GET', path: 'list', qs: fromId ? `fromId=${fromId}` : undefined }, cb);
  }

  static getPinned(cb) {
    this.makeCall({ method: 'GET', path: 'getPinned' }, cb);
  }

  static setPinned(id, pinned, cb) {
    this.makeCall({ method: 'POST', path: 'setPinnedState', body: { id, pinned } }, cb);
  }

  static sendText(type, content, cb) {
    this.makeCall({ method: 'POST', path: 'sendText', body: { type, content } }, cb);
  }

  static sendMedia(file, cb) {
    const form = new FormData();
    form.append('media', file);
    this.makeCall({ method: 'POST', path: 'sendMedia', form }, cb);
  }
}
