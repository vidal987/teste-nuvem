import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ClienteService } from '../../services/cliente.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import {Cliente} from '../../interfaces/Cliente';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-employee-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css',]
})
export class ClienteListComponent implements OnInit {
  icons = {
    faTrash,
    faEdit
  }

  // Sempre iniciar uma variavel já com um valor padrão
  cliente: Cliente[] = [];
  searchValue: string;

  constructor(
    private clienteService: ClienteService,

  ) { }

  ngOnInit(): void {
    // Nunca coloque regra de negócio na função "geral" da classe, sempre faça ela chamar metodos com as regras de negócio.
    this.getEmployees();
  }

  Search(){
    if(this.searchValue != "")
    {
      this.cliente = this.cliente.filter(res =>{
        res.name.toLowerCase().match(this.searchValue.toLowerCase());
      });

    }else if (this.searchValue == ""){
      this.ngOnInit();
    }
  }

  /**
   * Método para identificação do trackBy do ngFor da Lista dinamica.
   *
   * @param URL: https://angular.io/api/common/NgForOf#ngForTrackBy
   *
   * A function that defines how to track changes for items in the iterable.
   * When items are added, moved, or removed in the iterable,
   * the directive must re-render the appropriate DOM nodes.
   * To minimize churn in the DOM, only nodes that have changed are re-rendered.
   */
  identify(index: number, item: Cliente): number {
    return item?.id;
  }

  /**
   * Método responsavel para resgatar todos 'Clientes' do banco de dados.
   */
  getEmployees(): void {
    this.clienteService.All().subscribe((data: Cliente[]) => {
      this.cliente = data;
    });
  }

  /**
   * Método responsável por excluir um 'Cliente' pelo Id
   */
  deleteEmployee(id: number): void {
    // ==> Perguntar se o usuario quer realmente deletar..
    Swal.fire({
      title: 'Are you sure you want to delete the Cliente?',
      text: 'Watch out! This Cliente will be deleted!',
      icon: 'warning',
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEnterKey: true,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes! Please, delete it!'
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) { // ==> Detectar se a pergunta acima foi recusada
        Swal.fire({
          title: 'Cancel!',
          text: 'Returning to the Clientes List',
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        });
      } else { // Se a pergunta foi aceita entao...
        this.clienteService.DeleteClient(id).subscribe(res => {
          Swal.fire({
            title: 'Deleted it!',
            text: 'Cliente was deleted it!',
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEnterKey: true,
            allowEscapeKey: false,
          });
          this.getEmployees(); // ==> Renovar a lista.
        });
      }
    });
  }

}
