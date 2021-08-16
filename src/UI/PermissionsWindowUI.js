export default class PermissionsWindowUI {
  constructor() {
    this.permissionErrorWindow = document.getElementById('permissionsError');
    document.getElementById('permissionsErrorClose').addEventListener('click', () => this.permissionErrorWindow.classList.add('hidden'));
  }

  show() {
    this.permissionErrorWindow.classList.remove('hidden');
  }
}
