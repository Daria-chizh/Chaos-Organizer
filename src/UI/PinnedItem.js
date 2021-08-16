import ItemRenderer from './ItemRenderer';

export default class PinnedItem {
  constructor({ listeners }) {
    this.listeners = listeners;
    this.pinnedContainer = document.getElementById('pinned');
  }

  setPinned(item) {
    this.hasPinnedItem = !!item;

    this.pinnedContainer.replaceChildren();

    if (!item) {
      return;
    }

    const closeButton = document.createElement('span');
    closeButton.classList.add('closeButton');
    closeButton.textContent = '✖';
    closeButton.addEventListener('click', () => {
      if (this.listeners.onSetPinned) {
        this.listeners.onSetPinned(item, false);
      }
    });

    const itemContainer = document.createElement('div');
    itemContainer.classList.add('feedItem');
    itemContainer.appendChild(ItemRenderer.renderItem(item));

    this.pinnedContainer.appendChild(itemContainer);
    this.pinnedContainer.appendChild(closeButton);
  }

  hasPinned() {
    return this.hasPinnedItem;
  }
}
