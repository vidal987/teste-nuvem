import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ClientListComponent } from './client-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClientListComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [ClientListComponent],
  providers: [],
})
export class EmployeeListModule { }
