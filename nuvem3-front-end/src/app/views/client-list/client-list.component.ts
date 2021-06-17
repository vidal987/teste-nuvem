import { Component, OnInit } from '@angular/core';
import Client from '../../interfaces/Client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {


  // Sempre iniciar uma variavel já com um valor padrão
  client: Client[] = [];

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    // Nunca coloque regra de negócio na função "geral" da classe, sempre faça ela chamar metodos com as regras de negócio.
    this.getClients();
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
  identify(index: number, item: Client): number {
    return item.id;
  }

  /**
   * Método responsavel para resgatar todos 'Employees' do banco de dados.
   */
  getClients(): void {
    this.clientService.getClients().subscribe((data: Client[]) => {
      this.client = data;
    });
  }

  /**
   * Método responsável por excluir um 'Employee' pelo Id
   */
  deleteEmployee(id: number): void {
    // ==> Perguntar se o usuario quer realmente deletar..
    Swal.fire({
      title: 'Are you sure you want to delete the employee?',
      text: 'Watch out! This Employee will be deleted!',
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
          text: 'Returning to the Employees List',
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        });
      } else { // Se a pergunta foi aceita entao...
        this.clientService.deletClient(id).subscribe(res => {
          Swal.fire({
            title: 'Deleted it!',
            text: 'Employee was deleted it!',
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEnterKey: true,
            allowEscapeKey: false,
          });
          this.getClients(); // ==> Renovar a lista.
        });
      }
    });
  }

}
