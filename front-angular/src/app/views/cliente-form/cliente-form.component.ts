import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import {Cliente}  from '../../interfaces/Cliente';
import { faUserPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})

export class ClienteFormComponent implements OnInit {
  icons = {
    faUserPlus,
    faUserEdit
  };

  clienteForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', Validators.required],
  });
    id: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.checkParam();
  }

  checkParam(): void {
    this.route.params.subscribe(params => {
      // ==> caso a rota está com parametro, checamos se esse parametro é um ID
      if (params.id) {
        this.id = params.id;
        this.getEmployee(this.id);
      }
    });
  }


  getEmployee(id: number): void {
    this.clienteService.GetById(id).subscribe((res: Cliente) => {
      this.clienteForm.setValue({
        name: res.name,
        type: res.type,
        telefone: res.telefone,
        email: res.email,
      });
    });
  }


  createNewEmployee(): void {
    this.clienteService.CreatedClient(this.clienteForm.value).subscribe(res => {
      Swal.fire({
        title: 'Employee added successfully!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        // ==> Aguardar que a pessoa clique em OK no SweetAlert para que mude ela para a tela de listagem.
        this.router.navigate(['/clientes']);
      });
    });
  }


  updateEmployee(): void {
    const cliente: Cliente = {
      id: this.id,
      ...this.clienteForm.value
    };
    this.clienteService.UpdateClient(cliente).subscribe(res => {
      // ==> Depois que o usuário clicar no botão 'Update', será redirecionado para a página de listar
      Swal.fire({
        title: 'Employee updated successfully!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        this.router.navigate(['/clientes']);
      });
    });
  }

  /**
   * Método do submit do formulário.
   */
  onSubmit(): void {
    // Se  nao tem ID, então é para cadastrar.
    // Se  tem ID, então é para editar.
    if (!this.id) {
      this.createNewEmployee();
    } else {
      this.updateEmployee();
    }
  }

  /**
   * Método para recuperar a propriedade do formulario desejada
   */
  getControl(control: string): AbstractControl {
    return this.clienteForm.controls[control];
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
