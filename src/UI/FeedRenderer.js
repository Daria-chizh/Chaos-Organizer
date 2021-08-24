import ItemRenderer from './ItemRenderer';
import host from '../host';
import DownloadImage from '../../img/download.png';
import PinImage from '../../img/pin.png';

export default class FeedRenderer {
  constructor({ listeners, pinnedItem }) {
    this.feed = [];
    this.listeners = listeners;
    this.pinnedItem = pinnedItem;
    this.feedContainer = document.getElementById('feed');
    this.feedWrapper = document.getElementById('feedWrapper');
    this.feedWrapper.addEventListener('scroll', () => {
      const scrollPos = this.feedWrapper.scrollTop + this.feedWrapper.offsetHeight;
      if (scrollPos >= this.feedContainer.offsetHeight) {
        if (this.listeners.onScrollEnd) {
          this.listeners.onScrollEnd();
        }
      }
    });
  }

  static handleItemDownload(item, element) {
    const linkElement = document.createElement('a');
    linkElement.classList.add('link');
    linkElement.setAttribute('href', `${host}${item.content}?download=1`);
    linkElement.setAttribute('download', item.content);

    const downloadButton = document.createElement('img');
    downloadButton.classList.add('download');
    downloadButton.setAttribute('src', DownloadImage);
    linkElement.appendChild(downloadButton);

    element.appendChild(linkElement);
  }

  handleItemPin(item, element) {
    const pinButtonContainer = document.createElement('div');
    pinButtonContainer.classList.add('pinButton');

    const pinButton = document.createElement('img');
    pinButton.setAttribute('src', PinImage);
    pinButton.addEventListener('click', () => {
      if (this.listeners.onSetPinned) {
        this.listeners.onSetPinned(item, true);
      }
    });
    pinButtonContainer.appendChild(pinButton);

    element.parentNode.appendChild(pinButtonContainer);
  }

  render() {
    this.feedContainer.replaceChildren();

    for (const item of this.feed) {
      const itemElement = ItemRenderer.renderItem(item);
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('feedItem');
      itemContainer.appendChild(itemElement);

      // allow to pin only non-bot messages and if there is no pinned message yet
      if (item.type !== 'bot_reply' && !this.pinnedItem.hasPinned()) {
        this.handleItemPin(item, itemElement);
      }

      // allow to download images / videos / audios
      if (item.type === 'image' || item.type === 'video' || item.type === 'audio') {
        FeedRenderer.handleItemDownload(item, itemElement);
      }

      this.feedContainer.appendChild(itemContainer);
    }
  }

  prependItem(item) {
    this.feed.unshift(item);

    this.render();
  }

  appendItems(items) {
    for (const item of items) {
      this.feed.push(item);
    }

    this.render();
  }
}
