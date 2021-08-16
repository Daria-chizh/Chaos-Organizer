export default class RecordController {
  constructor() {
    this.timerElement = document.querySelector('.timer');
    this.controllerElement = document.querySelector('.recordController');
    this.mediaInputButtonsElement = document.querySelector('.mediaInputButtons');
    this.inputText = document.getElementById('inputText');

    document.querySelector('.iconOk').addEventListener('click', () => {
      if (this.onSuccess) {
        this.onSuccess();
        this.hide();
      }
    });

    document.querySelector('.iconCancel').addEventListener('click', () => {
      if (this.onCancel) {
        this.onCancel();
        this.hide();
      }
    });
  }

  hide() {
    this.mediaInputButtonsElement.classList.remove('hidden');
    this.inputText.classList.remove('hidden');
    this.controllerElement.classList.add('hidden');
    this.onSuccess = null;
    this.onCancel = null;
    clearInterval(this.timerId);
  }

  updateTimer() {
    this.second += 1;
    if (this.second > 60) {
      this.second = 0;
      this.minute += 1;
    }

    const formattedMinute = this.minute.toString().padStart(2, '0');
    const formattedSecond = this.second.toString().padStart(2, '0');
    this.timerElement.textContent = `${formattedMinute}:${formattedSecond}`;
  }

  show(onSuccess, onCancel) {
    this.second = 0;
    this.minute = 0;
    this.updateTimer();

    this.timerId = setInterval(() => this.updateTimer(), 1000);
    this.onSuccess = onSuccess;
    this.onCancel = onCancel;

    this.mediaInputButtonsElement.classList.add('hidden');
    this.inputText.classList.add('hidden');
    this.controllerElement.classList.remove('hidden');
  }
}
