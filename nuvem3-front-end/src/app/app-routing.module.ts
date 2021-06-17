import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // Quando alguem entrar no site: http://localhost:4200/  vai ser redirecionado para http://localhost:4200/employees
    redirectTo: '/client',
    pathMatch: 'full'
  },
  {
    path: 'client',
    loadChildren: () => import('./views/employee-list/client-list.module').then((m) => m.clientListModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./views/client-form/client-form.module').then((m) => m.clientFormModule)
  },
  {
    path: 'client/:id',
    loadChildren: () => import('./views/client-form/client-form.module').then((m) => m.clientFormModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
