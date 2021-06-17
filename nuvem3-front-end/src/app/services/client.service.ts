import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Client from '../interfaces/Client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'https://localhost:5001'
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Método responsável por criar um 'New Employee'
   */
  createNewEmployee(client: Client): Observable<any> {
    // ==> (POST - url no Back-End): http://locahost:3000/api/employees
    return this.http.post(`${this.url}/client`, client);
  }

  /**
   * Método responsável por listar todos os 'Employees'
   */
  getEmployees(): Observable<any> {
    // ==> (GET - Url no Back-End): http://localhost:3000/api/employees
    return this.http.get(`${this.url}}/client`);
  }

  /**
   * Método responsável por Atualizar um determinado 'Employee' por Id
   */
  getEmployee(id: number): Observable<any> {
    // ==> (GET - Url no Back-End): http://localhost:3000/api/employees/:id
    return this.http.get(`${this.url}/client/filter`);
  }

  /**
   * Método responsável pela action do botão Update no arquivo 'employee-edit.component.html'
   */
  updateEmployee(client: Client): Observable<any> {
    return this.http.put(`${this.url}/employees/${client.id}`, client);
  }

  /**
   * Método responsável por excluir um 'Employee' pelo id:
   */
  deleteEmployee(id: number): Observable<any> {
    // ==> (DELETE - Url no Back-End): http://localhost:3000/api/employees/:id
    return this.http.delete(`${this.url}/client/${id}`);
  }
}
