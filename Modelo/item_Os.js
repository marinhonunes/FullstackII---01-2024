export default class ItemOrdemDeServico {
  // #ordemDeServicoCodigo;
  #funcionarioCodigo;
  #descricaoOS;
  #precoUnitario;

  constructor(
    // ordemDeServicoCodigo,
    funcionarioCodigo,
    descricaoOS,
    precoUnitario
  ) {
    // this.#ordemDeServicoCodigo = ordemDeServicoCodigo;
    this.#funcionarioCodigo = funcionarioCodigo;
    this.#descricaoOS = descricaoOS;
    this.#precoUnitario = precoUnitario;
  }

  // get ordemDeServicoCodigo() {
  //   return this.#ordemDeServicoCodigo;
  // }

  // set ordemDeServicoCodigo(novoCodigo) {
  //   this.#ordemDeServicoCodigo = novoCodigo;
  // }

  get funcionarioCodigo() {
    return this.#funcionarioCodigo;
  }

  set funcionarioCodigo(novoCodigo) {
    this.#funcionarioCodigo = novoCodigo;
  }

  get descricaoOS() {
    return this.#descricaoOS;
  }

  set descricaoOS(novaDescricao) {
    this.#descricaoOS = novaDescricao;
  }

  get precoUnitario() {
    return this.#precoUnitario;
  }

  set precoUnitario(novoPreco) {
    this.#precoUnitario = novoPreco;
  }

  toJSON() {
    return {
      // ordemDeServicoCodigo: this.#ordemDeServicoCodigo,
      funcionarioCodigo: this.#funcionarioCodigo,
      descricaoOS: this.#descricaoOS,
      precoUnitario: this.#precoUnitario,
    };
  }
}
