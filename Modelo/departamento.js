import DepartamentoDAO from "../Persistencia/funcionarioDAO.js";

export default class Departamento {
    #codigo;
    #nome;

    constructor(codigo = 0, nome = '') {
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
            codigo: this.#codigo,
            nome: this.#nome
        }
    }

    async gravar() {
        const departamentoDAO = new DepartamentoDAO();
        await departamentoDAO.gravar(this);
    }

    async excluir() {
        const departamentoDAO = new DepartamentoDAO();
        await departamentoDAO.excluir(this);
    }

    async atualizar() {
        const departamentoDAO = new DepartamentoDAO();
        await departamentoDAO.atualizar(this);
    }

    async consultar(parametro) {
        const departamentoDAO = new DepartamentoDAO();
        return await departamentoDAO.consultar(parametro);
    }
}
