import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../interfaces/Client';


@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {


  products = [];

  constructor(private clientService: ClientService, cliente: Client) { }

  ngOnInit() {
    this.clientService.sendGetRequest().subscribe(data => (
      console.log(data)

    ))

  }

}
