import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private _dialogVisible = signal(false);
    private _dialogVisibleImage = signal(false);

  readonly isDialogVisible = computed(() => this._dialogVisible());
  readonly isDialogVisibleImage = computed(() => this._dialogVisibleImage());

  openDialog() {
    this._dialogVisible.set(false);
    queueMicrotask(() => this._dialogVisible.set(true));
  }

  closeDialog() {
    this._dialogVisible.set(false);
  }

  openDialogImage() {
    this._dialogVisibleImage.set(false);
    queueMicrotask(() => this._dialogVisibleImage.set(true));
  }

  closeDialogImage() {
    this._dialogVisibleImage.set(false);
  }
}