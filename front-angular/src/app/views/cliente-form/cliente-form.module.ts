
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ClienteFormComponent } from './cliente-form.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteFormComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  exports: [RouterModule],
  declarations: [ClienteFormComponent],
  providers: [],
})
export class ClienteFormModule { }
