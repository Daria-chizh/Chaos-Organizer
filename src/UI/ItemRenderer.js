import host from '../host';

export default class ItemRenderer {
  static renderItem(item) {
    switch (item.type) {
      case 'text': {
        const element = document.createElement('span');
        element.textContent = item.content;
        return element;
      }
      case 'link': {
        const element = document.createElement('a');
        element.setAttribute('href', item.content);
        element.setAttribute('target', '_blank');
        element.textContent = item.content;
        return element;
      }
      case 'image': {
        const element = document.createElement('img');
        element.classList.add('imageContainer');
        element.setAttribute('src', `${host}${item.content}`);
        return element;
      }
      case 'geoposition': {
        const element = document.createElement('div');
        element.textContent = `[ ${item.content} ]`;
        return element;
      }
      case 'audio': {
        const element = document.createElement('audio');
        element.setAttribute('controls', '');
        element.setAttribute('src', `${host}${item.content}`);
        return element;
      }
      case 'video': {
        const element = document.createElement('video');
        element.setAttribute('controls', '');
        element.setAttribute('src', `${host}${item.content}`);
        return element;
      }
      case 'bot_reply': {
        const element = document.createElement('span');
        element.textContent = item.content;
        return element;
      }
      default:
        return null;
    }
  }
}
