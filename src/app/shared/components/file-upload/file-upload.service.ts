import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  uploadFile(file: File, item: any): any {
    if (file) {
      const data = new FormData();

      data.append('files', file, file.name);
      const entries = Object.entries(item);
      for (const [key, value] of entries) {
        data.append(`${key}`, value.toString());
      }

      return this.http.post(this.url, data);
    }
  }
}
