import AudioRecorder from '../Media/AudioRecorder';
import Api from '../Api';

export default class VideoRecorderUI {
  constructor({ recordController, permissionsWindow, feed }) {
    this.audioRecorder = new AudioRecorder(recordController);
    this.permissionsWindow = permissionsWindow;
    this.feed = feed;
  }

  render() {
    document.getElementById('recordAudio').addEventListener('click', () => this.audioRecorder.record(
      (blob) => {
        const file = new File([blob], 'audio.webm', { type: 'audio/webm' });
        Api.sendMedia(file, (resp) => this.feed.prependItem(resp));
      },
      () => this.permissionsWindow.show(),
    ));
  }
}
