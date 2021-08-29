export default class VideoRecorder {
  constructor(recordController) {
    this.recordController = recordController;
  }

  async record(containerForPreview, onSuccess, onError) {
    if (!window.MediaRecorder) {
      onError();
      return;
    }

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    } catch (err) {
      onError();
      return;
    }

    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    const chunks = [];
    let saveVideo = true;

    const currentVideo = document.createElement('video');
    currentVideo.classList.add('currentVideo');
    containerForPreview.insertBefore(currentVideo, containerForPreview.firstChild);
    currentVideo.setAttribute('autoplay', 'true');
    currentVideo.setAttribute('muted', '');
    currentVideo.srcObject = stream;

    this.recordController.show(
      () => {
        currentVideo.parentNode.removeChild(currentVideo);
        recorder.stop();
      },
      () => {
        saveVideo = false;
        currentVideo.parentNode.removeChild(currentVideo);
        recorder.stop();
      },
    );

    recorder.addEventListener('dataavailable', (evt) => {
      chunks.push(evt.data);
    });

    recorder.addEventListener('stop', () => {
      if (saveVideo) {
        onSuccess(new Blob(chunks, { type: 'video/webm' }));
      }
    });
    recorder.start();
  }
}
