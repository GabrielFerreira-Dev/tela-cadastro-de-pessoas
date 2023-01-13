import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { MatListModule } from '@angular/material/list'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { TarefasComponent } from './tarefas/tarefas.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CadastrarComponent,
    TarefasComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatChipsModule,
    HttpClientModule
  ],
  exports: [
    CadastrarComponent,
    TarefasComponent
  ]
})
export class PessoasModule { }
