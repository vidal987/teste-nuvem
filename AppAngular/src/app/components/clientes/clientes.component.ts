import { ClienteService } from '../../cliente.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/Cliente';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClienteComponent implements OnInit {
  formulario: any;
  tituloFormulario: string;
  cliente: Cliente[];
  name: string;
  id: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef: BsModalRef;

  constructor(private clienteService: ClienteService,
    private modalService: BsModalService) {}

  ngOnInit(): void {
    this.All();
  }

  All(){
    this.clienteService.All().subscribe((data: Cliente[]) =>{
      this.cliente = data;
      console.log(data);

    })
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Novo Cliente';
    this.formulario = new FormGroup({
      name: new FormControl(null),
      type: new FormControl(null)
    });
  }

  ExibirFormularioAtualizacao(id): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.clienteService.GetById(id).subscribe((data) => {
      this.tituloFormulario = `Atualizar ${data.name} ${data.type}`;

      this.formulario = new FormGroup({
        name: new FormControl(data.name),
        type: new FormControl(data.type),
      });
    });
  }

  EnviarFormulario(): void {
    const cliente: Cliente = this.formulario.value;

    if (cliente.id > 0) {
      this.clienteService.UpdateClient(cliente).subscribe((data) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Cliente atualizado com sucesso');
        this.clienteService.All().subscribe((data) => {
          this.cliente = data;
        });
      });
    } else {
      this.clienteService.CreatedClient(cliente).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Cliente inserida com sucesso');
        this.clienteService.All().subscribe((registros) => {
          this.cliente = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(id, name, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.id = id;
    this.name = name;
  }


    ExcluirCliente(id: number): void{
    this.clienteService.DeleteClient(id).subscribe(data => {
      this.modalRef.hide();
      alert('Cliente excluída com sucesso');
      this.clienteService.All().subscribe(registros => {
        this.cliente = registros;
      });
    });
    }
}
