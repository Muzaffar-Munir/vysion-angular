import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  constructor(
    private http: HttpClient,
  ) { }
  getAttachments(): any {
    return this.http.get('http://localhost:3000/attachment/get-attachment');
  }
  uploadAttachment(data: any): any {
    return this.http.post('http://localhost:3000/attachment/attachment-upload', data);
  }
}
