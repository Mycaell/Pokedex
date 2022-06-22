import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage = localStorage;

  constructor() {}

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  setItem(key: string, data: string): void {
    this.storage.setItem(key, data);
  }
}
