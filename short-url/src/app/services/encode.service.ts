import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncodeService {

  dec2hex (dec:any) {
    return dec.toString(16).padStart(2, "0")
  }

  generateId (len:any) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, this.dec2hex).join('')
  }

}