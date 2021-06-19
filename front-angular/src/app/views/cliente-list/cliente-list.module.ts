
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ClienteListComponent } from './cliente-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule }   from '@angular/forms';
import { SearchfPipe } from '../../searchf.pipe';




const routes: Routes = [
  {
    path: '',
    component: ClienteListComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [RouterModule],
  declarations: [ClienteListComponent, SearchfPipe],
  providers: [],
})
export class ClienteListModule { }
