import Api from '../Api';

export default class TextMessageUI {
  constructor({ feed }) {
    this.feed = feed;
  }

  render() {
    document.getElementById('inputText').addEventListener('keypress', (event) => {
      const inputElement = event.currentTarget;
      const inputText = inputElement.value;
      if (event.code !== 'Enter' || inputText === '') {
        return;
      }
      Api.sendText('text', inputText, (resp) => this.feed.prependItem(resp));
      inputElement.value = '';
      event.preventDefault();
    });
  }
}
