import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './pessoas';
import { TarefasComponent } from './pessoas/tarefas';

const routes: Routes = [
  {
    path: 'cadastrarPessoa',
    component: CadastrarComponent    
  },
  {
    path: 'tarefas',
    component: TarefasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
