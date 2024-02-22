import FuncionarioDAO from "../Persistencia/FuncionarioDAO.js";

export default class Funcionario {
    #codigo;
    #nome;
    #cargo;
    #salario;
    #dataContratacao;
    #departamento;

    constructor(codigo = 0, nome = "", cargo = "", salario = 0, dataContratacao = '', departamento = {}) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cargo = cargo;
        this.#salario = salario;
        this.#dataContratacao = dataContratacao;
        this.#departamento = departamento;
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

    get cargo() {
        return this.#cargo;
    }

    set cargo(novoCargo) {
        this.#cargo = novoCargo;
    }

    get salario() {
        return this.#salario;
    }

    set salario(novoSalario) {
        this.#salario = novoSalario;
    }

    get dataContratacao() {
        return this.#dataContratacao;
    }

    set dataContratacao(novaDataContratacao) {
        this.#dataContratacao = novaDataContratacao;
    }

    get departamento() {
        return this.#departamento;
    }

    set departamento(novoDepartamento) {
        this.#departamento = novoDepartamento;
    }



    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            cargo: this.#cargo,
            salario: this.#salario,
            dataContratacao: this.#dataContratacao,
            departamento: this.#departamento,
        }
    }

    async gravar() {
        const funcionarioDAO = new FuncionarioDAO();
        await funcionarioDAO.gravar(this);
    }

    async excluir() {
        const funcionarioDAO = new FuncionarioDAO();
        await funcionarioDAO.excluir(this);
    }

    async atualizar() {
        const funcionarioDAO = new FuncionarioDAO();
        await funcionarioDAO.atualizar(this);
    }

    async consultar(termo) {
        const funcionarioDAO = new FuncionarioDAO();
        return await funcionarioDAO.consultar(termo);
    }
}
