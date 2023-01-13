import { Pessoa } from "./pessoa";

export class Professor extends Pessoa {
    conhecimentos: string[];
    especialidade: string;

    constructor(
        data: any
    ) {
        super(data);
        this.conhecimentos = data.conhecimentos;
        this.especialidade = data.especialidade;
    }
}