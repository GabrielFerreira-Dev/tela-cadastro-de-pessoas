import { Pessoa } from "./pessoa";

export class Aluno extends Pessoa {
    numeroMatricula: string;

    constructor(
        data: any
    ) {
        super(data);
        this.numeroMatricula = data.numeroMatricula;
    }

}