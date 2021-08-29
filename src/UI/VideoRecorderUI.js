import VideoRecorder from '../Media/VideoRecorder';
import Api from '../Api';

export default class VideoRecorderUI {
  constructor({ recordController, permissionsWindow, feed }) {
    this.videoRecorder = new VideoRecorder(recordController);
    this.videoPreviewContainer = document.getElementById('videoPreview');
    this.permissionsWindow = permissionsWindow;
    this.feed = feed;
  }

  render() {
    document.getElementById('recordVideo').addEventListener('click', () => this.videoRecorder.record(
      this.videoPreviewContainer,
      (blob) => {
        const file = new File([blob], 'video.webm', { type: 'video/webm' });
        Api.sendMedia(file, (resp) => this.feed.prependItem(resp));
      },
      () => this.permissionsWindow.show(),
    ));
  }
}
