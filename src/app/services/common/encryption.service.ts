import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private secretKey: string = environment.encryptionKey;

  constructor() {}

  // Encrypt Data
  encryptData(data: any): string {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    } catch (e) {
      console.error('Encryption error:', e);
      return '';
    }
  }

  // Decrypt Data
  decryptData(encryptedData: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return null;
    } catch (e) {
      console.error('Decryption error:', e);
      return null;
    }
  }

  // Store Encrypted Data in localStorage
  saveToLocalStorage(key: string, data: any): void {
    console.log(data);
    
    const encryptedData = this.encryptData(data);
    localStorage.setItem(key, encryptedData);
  }

  // Retrieve Decrypted Data from localStorage
  getFromLocalStorage(key: string): any {
    const encryptedData = localStorage.getItem(key);
    console.log(this.encryptData("U2FsdGVkX18QOL4zDSepaS04pLswOHsX2rAdO5cJ06s="));
    
    return encryptedData ? this.decryptData(encryptedData) : null;
  }

  // Remove Item from localStorage
  removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
