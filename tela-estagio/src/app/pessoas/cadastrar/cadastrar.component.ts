import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Aluno } from '../models/aluno';
import { Endereco } from '../models/endereco';
import { Pessoa } from '../models/pessoa';
import { Professor } from '../models/professor';
import { PessoaService } from '../shared';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  pessoaExistente = false;
  botao = false;
  isProfessor = false;
  pessoas: Pessoa[];
  private _pessoa?: Pessoa;

  get conhecimentos() {
    if (!this.professor) return undefined;
    if (this.professor && this.professor.conhecimentos === undefined) this.professor.conhecimentos = [];
    return this.professor.conhecimentos;
  }

  get professor() {
    if (this._pessoa instanceof Professor) return this._pessoa;
    return undefined;
  }

  public get pessoa(): Pessoa {
    return this._pessoa;
  }

  public set pessoa(value: Pessoa) {
    this._pessoa = value;
    this.isProfessor = value instanceof Professor;
    console.log(value);
    this.resetForm(this._pessoa);
  }

  form: FormGroup = this.fb.group<any>({
    nome: ["", [Validators.required]],
    dataNascimento: ["", []],
    cpf: ["", [Validators.required]],
    numeroMatricula: ["", []],
    especialidade: ["", []],
    conhecimentos: ["", []],
  });

  formEndereco: FormGroup = this.fb.group({
    logradouro: ["", []],
    numero: ["", []],
    municipio: ["", []],
    uf: ["", []],
  })

  constructor(
    private readonly fb: FormBuilder,
    private pessoaService: PessoaService
  ) { };

  ngOnInit() {
    this.obterTodos()
  }

  resetForm(pessoa: any) {
    this.form.reset({
      nome: pessoa.nome ? pessoa.nome : "",
      dataNascimento: pessoa.dataNascimento ? pessoa.dataNascimento : "",
      cpf: pessoa.cpf ? pessoa.cpf : "",
      numeroMatricula: pessoa.numeroMatricula ? pessoa.numeroMatricula : "",
      especialidade: pessoa.especialidade ? pessoa.especialidade : "",
      conhecimentos: pessoa.conhecimentos ? pessoa.conhecimentos : "",
    });
    this.formEndereco.reset({
      logradouro: pessoa.endereco ? pessoa.endereco.logradouro ? pessoa.endereco.logradouro : "" : "",
      numero: pessoa.endereco ? pessoa.endereco.numero ? pessoa.endereco.numero : "" : "",
      municipio: pessoa.endereco ? pessoa.endereco.municipio ? pessoa.endereco.municipio : "" : "",
      uf: pessoa.endereco ? pessoa.endereco.uf ? pessoa.endereco.uf : "" : "",
    });
    this.pessoaExistente = pessoa.cpf ? true : false;
  }

  salvar(): void {
    if(this.form.invalid) return;
    Object.assign(this.pessoa, this.form.getRawValue());
    if (this.pessoa.endereco) {
      Object.assign(this.pessoa.endereco, this.formEndereco.getRawValue());
    } else {
      this.pessoa.endereco = new Endereco(this.formEndereco.getRawValue());
    }

    if (this.pessoa instanceof Professor && this.professor.conhecimentos !== undefined) {
      (this.pessoa as Professor).conhecimentos = this.pessoa.conhecimentos;
    } else {
      (this.pessoa as Professor).conhecimentos = undefined;
    }

    if (this.pessoas.indexOf(this.pessoa) > -1)
      this.pessoaService.salvar(this.pessoa);
    else
      this.pessoaService.incluir(this.pessoa).then(p => this.pessoas.push(this.pessoa));
  }

  async obterTodos() {
    this.pessoas = await this.pessoaService.listarTodos();
  }

  criarNovo() {
    this.pessoa = prompt('Professor ou Aluno?').toLocaleLowerCase().indexOf('a') > -1 ? new Aluno({}) : new Professor({
      conhecimentos: [],
      especialidade: "",
      nome: "",
      cpf: "",
      idade: "",
    });
    this.botaoSalvar();
  }

  async buscarPorCpf() {
    let valor = prompt('Digite o CPF:');
    this.pessoa = await this.pessoaService.obterPorCpf(valor);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Adiciona o conhecimento
    if (value) {
      this.conhecimentos.push(value);
    }

    // Limpa o valor do input
    event.chipInput!.clear();
  }

  remove(conhecimento: string): void {
    const index = this.conhecimentos.indexOf(conhecimento);

    if (index >= 0) {
      this.conhecimentos.splice(index, 1);
    }
  }

  edit(conhecimento: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove o conhecimento caso não tenha um nome
    if (!value) {
      this.remove(conhecimento);
      return;
    }

    // Edita um conhecimento existente
    const index = this.conhecimentos.indexOf(conhecimento);
    if (index >= 0) {
      this.conhecimentos[index] = value;
    }    
  }
  
  botaoSalvar(){
    this.botao = true;
  }
}
