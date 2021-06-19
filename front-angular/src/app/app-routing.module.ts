import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Adicionado metodo LazyLoad para as rotas.
const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes',
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    loadChildren: () => import('./views/cliente-list/cliente-list.module').then((m) => m.ClienteListModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./views/cliente-form/cliente-form.module').then((m) => m.ClienteFormModule)
  },
  {
    path: 'cliente/:id',
    loadChildren: () => import('./views/cliente-form/cliente-form.module').then((m) => m.ClienteFormModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
