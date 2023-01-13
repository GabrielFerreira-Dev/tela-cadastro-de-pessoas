import { Endereco } from "./endereco";

export class Pessoa {
    nome: string;
    endereco: Endereco;
    dataNascimento: Date;
    cpf: string;
    idade: number;

    constructor(
        data: any
    ) {
        this.nome = data.nome;
        this.endereco = data.endereco ? new Endereco(data.endereco) : null;
        this.dataNascimento = data.dataNascimento ?  new Date(data.dataNascimento) : null;
        this.cpf = data.cpf;
    }

    getIdade() {
        const idadeInvalida = "Idade não informada!";
        if(this.dataNascimento.getFullYear() <= 2023){
            let idade = 2023 - this.dataNascimento.getFullYear();
            return idade + " anos de idade";
        }  else {
            return idadeInvalida;
        }
    }
   
}