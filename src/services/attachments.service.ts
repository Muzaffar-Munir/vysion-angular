import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  uploadAttachment(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/attachment/attachment-upload', data);
  }
}
