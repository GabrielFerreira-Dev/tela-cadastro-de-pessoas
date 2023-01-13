import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Aluno } from '../models/aluno';
import { Professor } from '../models/professor';
import { Pessoa } from '../models/pessoa';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }


  async listarTodos() {
    return await firstValueFrom(this.httpClient.get<any[]>("http://10.250.250.108:8084/estagiario/api/pessoa/obterLista").pipe(map(r => r ? r.map(v => v.numeroMatricula !== undefined ? new Aluno(v) : new Professor(v)) : null)));
  }

  async obterPorCpf(cpf: string) {
    return await firstValueFrom(this.httpClient.get<Pessoa | Aluno | Professor>("http://10.250.250.108:8084/estagiario/api/pessoa/obterPorCpf?cpf=" + cpf).pipe(map((r: any) => r ? r.numeroMatricula ? new Aluno(r) : new Professor(r) : null)));
  }

  async salvar(pessoa: Pessoa) {
    return await firstValueFrom(this.httpClient.post<void>(`http://10.250.250.108:8084/estagiario/api/${pessoa instanceof Aluno ? 'aluno' : 'professor'
      }/alterar`, pessoa));
  }
  
  async incluir(pessoa: Pessoa) {
    return await firstValueFrom(this.httpClient.post<void>(`http://10.250.250.108:8084/estagiario/api/${pessoa instanceof Aluno ? 'aluno' : 'professor'
      }/manter`, pessoa));
  }
}
