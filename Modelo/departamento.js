import DepartamentoDAO from "../Persistencia/departamentoDAO.js";

export default class Departamento {
    #codigo;
    #nome;

    constructor(codigo=0, nome = '') {
        this.#codigo = codigo;
        this.#nome = nome;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    toJSON() {
        return {
            codigo:this.#codigo,
            nome:this.#nome
        }
    }

    async gravar() {
        const depDAO = new DepartamentoDAO();
        await depDAO.gravar(this);
    }

    async excluir() {
        const depDAO = new DepartamentoDAO();
        await depDAO.excluir(this);
    }

    async atualizar() {
        const depDAO = new DepartamentoDAO();
        await depDAO.atualizar(this);
    }

    async consultar(parametro) {
        const depDAO = new DepartamentoDAO();
        return await depDAO.consultar(parametro);
    }
}
