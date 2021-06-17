export default interface Client {
  id?: number; // Setamos o ID como opcional, para que seja possível re-utilizar a interface tanto para editar, quanto para o resto.
  name: string;
  type: string;
}
