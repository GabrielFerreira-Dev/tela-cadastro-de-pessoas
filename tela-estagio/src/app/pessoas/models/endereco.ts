export class Endereco {
    logradouro: string;
    municipio: string;
    numero: string;
    uf: string;

    constructor(
        data: any
    ) {
        this.logradouro = data.logradouro;
        this.municipio = data.municipio;
        this.numero = data.numero;
        this.uf = data.uf;
    }

    toString() {
        return this.logradouro + ", " + this.numero + " - " + this.municipio + " - " + this.uf;
    }
}