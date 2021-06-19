import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from './interfaces/Cliente';

@Pipe({
  name: 'searchf'
})
export class SearchfPipe implements PipeTransform {

  transform(clientes: Cliente[], searchValue: string): Cliente[] {

    if(!clientes || !searchValue){
      return clientes;
    }
    return clientes.filter(cliente =>
       cliente.name.toLowerCase().includes(searchValue.toLowerCase()) ||
       cliente.type.toLowerCase().includes(searchValue.toLowerCase())
       );
  }

}
