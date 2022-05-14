import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {
  apiUrl: any;
  constructor(
    private http: HttpClient,
  ) {
    this.apiUrl = environment.apiUrl;
  }
  getAttachments(query: any): any {
    return this.http.post(`${this.apiUrl}attachment/get-attachment`, query);
  }
  uploadAttachment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}attachment/attachment-upload`, data);
  }
  deleteAttachment(id: any): any {
    return this.http.delete(`${this.apiUrl}attachment/delete-attachment/${id}`);
  }
  deleteAttachment(_id: any): any{
    return this.http.delete('http://localhost:3000/attachment/delete-attachment', _id);
  }
}
