import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './Cliente';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  url = 'https://localhost:5001/api/client';

  constructor(private http: HttpClient) { }

  All(): Observable<any> {

    console.log(this.http.get<any>(this.url))
    return this.http.get<any>(this.url)

  }

  GetById(clientId: Number): Observable<Cliente>{
    const apiUrl = `${this.url}/${clientId}`;

    return this.http.get<Cliente>(apiUrl);
  }

  CreatedClient(client: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, client, httpOptions);
  }

  UpdateClient(client: Cliente): Observable<any> {
    return this.http.put<Cliente>(this.url, client, httpOptions);
  }

  DeleteClient(id: number): Observable<any> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
