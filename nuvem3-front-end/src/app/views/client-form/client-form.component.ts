import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';

import { ActivatedRoute, Router } from '@angular/router';
import Client from '../../interfaces/Client';

import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {


  employeeForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    tpe: ['', Validators.required],
  });
  id: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clienteService: ClientService  )
    { }

  ngOnInit(): void {
    this.checkParam();
  }

  /**
   * Método para checar se a rota está ou não com parametros
   * Esse método é chamado apos a criação do formulário para garantir que ao momento que trazer os
   * dados do 'Employee' da API o formulário já esteja criado
   */
  checkParam(): void {
    this.route.params.subscribe(params => {
      // ==> caso a rota está com parametro, checamos se esse parametro é um ID
      if (params.id) {
        this.id = params.id;
        this.getEmployee(this.id);
      }
    });
  }

  /**
   * Método para pegar o 'Employee' da base de dados
   */
  getEmployee(id: number): void {
    this.clientService.getClient(id).subscribe((res: Client) => {
      this.employeeForm.setValue({
        name: res.name,
        type: res.type
      });
    });
  }

  /**
   * Método responsável por adicionar um novo 'Employee' --> ação do botão
   */
  createNewClient(): void {
    this.clientService.createNewClient(this.employeeForm.value).subscribe(res => {
      Swal.fire({
        title: 'Employee added successfully!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        // ==> Aguardar que a pessoa clique em OK no SweetAlert para que mude ela para a tela de listagem.
        this.router.navigate(['/employees']);
      });
    });
  }

  /**
   * Método responsável por Atualizar o 'Employee' por Id através da action do botão 'Update'
   */
  updateEmployee(): void {
    // ==> cria um novo objeto com as mesmas propriedades do formulário, para que seja possivel adicionar o id do 'Employee'
    const client: Client = {
      employee_id: this.id,
      ...this.employeeForm.value
    };
    this.clientService.updateEmployee(client).subscribe(res => {
      // ==> Depois que o usuário clicar no botão 'Update', será redirecionado para a página de listar 'Employees'
      Swal.fire({
        title: 'Employee updated successfully!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        this.router.navigate(['/employees']);
      });
    });
  }

  /**
   * Método do submit do formulário.
   */
  onSubmit(): void {
    // Se employee nao tem ID, então é para cadastrar.
    // Se employee tem ID, então é para editar.
    if (!this.id) {
      this.createNewClient();
    } else {
      this.updateClient();
    }
  }

  /**
   * Método para recuperar a propriedade do formulario desejada
   */
  getControl(control: string): AbstractControl {
    return this.clientForm.controls[control];
  }

  /**
   * Método para validação do campo desejado
   */
  validatorInputs(control: string): boolean {
    return this.getControl(control).invalid && (this.getControl(control).dirty || this.getControl(control).touched);
  }

  /**
   * Método para validação do campo desejado
   */
  validatorErrorsRequired(control: string): boolean {
    return this.getControl(control).errors.required;
  }
}
