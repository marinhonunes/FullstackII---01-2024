export default class ItemOrdemDeServico {
  #funcionarioCodigo;
  #descricaoOS;
  #precoUnitario;

  constructor(
    funcionarioCodigo,
    descricaoOS,
    precoUnitario
  ) {
    this.#funcionarioCodigo = funcionarioCodigo;
    this.#descricaoOS = descricaoOS;
    this.#precoUnitario = precoUnitario;
  }


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
      funcionarioCodigo: this.#funcionarioCodigo,
      descricaoOS: this.#descricaoOS,
      precoUnitario: this.#precoUnitario,
    };
  }
}
