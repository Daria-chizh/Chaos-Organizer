export default class AudioRecorder {
  constructor(recordController) {
    this.recordController = recordController;
  }

  async record(onSuccess, onError) {
    if (!window.MediaRecorder) {
      onError();
      return;
    }

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch (err) {
      onError();
      return;
    }

    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    const chunks = [];
    let saveAudio = true;
    this.recordController.show(
      () => recorder.stop(),
      () => {
        saveAudio = false;
        recorder.stop();
      },
    );

    recorder.addEventListener('dataavailable', (evt) => {
      chunks.push(evt.data);
    });

    recorder.addEventListener('stop', () => {
      if (saveAudio) {
        onSuccess(new Blob(chunks));
      }
    });

    recorder.start();
  }
}
