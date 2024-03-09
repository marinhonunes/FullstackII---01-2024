import OrdemDeServicoDAO from "../Persistencia/os_DAO.js";

export default class OrdemDeServico {
  #codigo;
  #cliente;
  #dataOrdem;
  #total;
  #itens;

  constructor(codigo, cliente, dataOrdem, total, itens) {
    this.#codigo = codigo;
    this.#cliente = cliente;
    this.#dataOrdem = dataOrdem;
    this.#total = total;
    this.#itens = itens;
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(novoCodigo) {
    if (novoCodigo === "" || typeof novoCodigo !== "number") {
      console.log("Formato de dado inválido");
    } else {
      this.#codigo = novoCodigo;
    }
  }

  get cliente() {
    return this.#cliente;
  }

  set cliente(novoCliente) {
    this.#cliente = novoCliente;
  }

  get dataOrdem() {
    return this.#dataOrdem;
  }

  set dataOrdem(novadataOrdem) {
    this.#dataOrdem = novadataOrdem;
  }

  get total() {
    return this.#total;
  }

  set total(novoTotal) {
    this.#total = novoTotal;
  }

  get itens() {
    return this.#itens;
  }

  set itens(novosItens) {
    this.#itens = novosItens;
  }

  toJSON() {
    return {
      'codigo': this.#codigo,
      'cliente': this.#cliente,
      'dataOrdem': this.#dataOrdem,
      'total': this.#total,
      'itens': this.#itens,
    };
  }

  async gravar() {
    const ordemDeServicoDAO = new OrdemDeServicoDAO();
    this.codigo = await ordemDeServicoDAO.gravar(this);
  }

  async atualizar() {
    const ordemDeServicoDAO = new OrdemDeServicoDAO();
    await ordemDeServicoDAO.alterar(this);
  }

  async apagar() {
    const ordemDeServicoDAO = new OrdemDeServicoDAO();
    await ordemDeServicoDAO.excluir(this);
  }

  async consultar(termoBusca) {
    const ordemDeServicoDAO = new OrdemDeServicoDAO();
    const listaOrdensDeServico = await ordemDeServicoDAO.consultar(termoBusca);
    return listaOrdensDeServico;
  }
}
