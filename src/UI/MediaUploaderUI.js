import Api from '../Api';
import FileUploader from '../Media/FileUploader';

export default class MediaUploaderUI {
  constructor({ feed }) {
    this.feed = feed;
  }

  render() {
    const uploadMediaWindow = document.getElementById('uploadMediaWindow');
    document.getElementById('uploadMedia').addEventListener('click', () => uploadMediaWindow.classList.toggle('hidden'));
    document.getElementById('uploadMediaCancel').addEventListener('click', () => uploadMediaWindow.classList.add('hidden'));

    document.getElementById('geolocationContainer').addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(
        (position) => Api.sendText('geoposition', `${position.coords.latitude}, ${position.coords.longitude}`, (resp) => this.feed.prependItem(resp)),
      );
    });

    const fileUploader = new FileUploader('fileUploader');
    fileUploader.addEventListener('fileLoaded', () => {
      const file = fileUploader.currentFile;
      Api.sendMedia(file, (resp) => this.feed.prependItem(resp));
    });
    fileUploader.render();
  }
}
