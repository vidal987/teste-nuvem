
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/Cliente';

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

  GetById(id: number): Observable<Cliente>{
    const apiUrl = `${this.url}/${id}`;

    return this.http.get<Cliente>(apiUrl);
  }


  GetByFilter(name: string, type: string): Observable<any>{
    const apiUrl = ` ${this.url}/filter?name=${name}&type=${type}`;

    console.log(this.http.get<any>(apiUrl,httpOptions))
    return this.http.get<any>(apiUrl,httpOptions)

  }

  CreatedClient(client: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, client, httpOptions);
  }

  UpdateClient(cliente: Cliente): Observable<any> {
    const apiUrl = `${this.url}/${cliente.id}`;
    return this.http.put(apiUrl,cliente, httpOptions );
  }

  DeleteClient(id: number): Observable<any> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
