import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent} from './cadastro/cadastro.component'

const routes: Routes = [
  { path: '',   redirectTo: '/listagem', pathMatch: 'full' },
  { path: 'listagem', component: ListagemComponent },
  { path: 'cadastro', component: CadastroComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
