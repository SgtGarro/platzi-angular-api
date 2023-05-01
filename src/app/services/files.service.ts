import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface File {
  originalname: string;
  filename: string;
  location: string;
}
@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private API_URL: string;
  constructor(private http: HttpClient) {
    this.API_URL = `${environment.API_URL}/api/files`;
  }

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);

    // const headers = new HttpHeaders().set(
    //   'Content-Type',
    //   'multipart/form-data'
    // );
    return this.http.post<File>(`${this.API_URL}/upload`, dto);
  }
}
