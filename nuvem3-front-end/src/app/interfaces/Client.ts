export class Client {
  id?: number; // Setamos o ID como opcional, para que seja possível re-utilizar a interface tanto para editar, quanto para o resto.
  name: string;
  type: string;

  constructor(name: string, type: string){
    this.name = name;
    this.type = type;
  }
}
