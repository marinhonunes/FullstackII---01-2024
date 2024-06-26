import Funcionario from "../Modelo/Funcionario.js"; // Certifique-se de que o caminho do arquivo está correto.
import conectar from "./conexao.js";
import Departamento from "../Modelo/departamento.js";

export default class FuncionarioDAO {

  async gravar(funcionario) {
    if (funcionario instanceof Funcionario) {
        const departamentoCodigo = funcionario.departamento.codigo; // Acessando o valor do código do departamento
        const sql = "INSERT INTO funcionario(func_nome, func_cargo, func_salario, func_dataContratacao, func_departamento_id) VALUES (?, ?, ?, ?, ?)";
        const parametros = [funcionario.nome, funcionario.cargo, funcionario.salario, funcionario.dataContratacao, departamentoCodigo]; // Passando o código do departamento como um parâmetro separado
        const conexao = await conectar();
        try {
            const retorno = await conexao.execute(sql, parametros);
            funcionario.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
            return true; // Indicando que a operação foi bem-sucedida
        } catch (erro) {
            console.error("Erro ao registrar o funcionário:", erro);
            return false; // Indicando que ocorreu um erro
        }
    }
    return false; // Indicando que o parâmetro passado não é uma instância válida de Funcionario
}
  async atualizar(funcionario) {
    if (funcionario instanceof Funcionario) {
      const sql = `UPDATE funcionario SET func_nome = ?, func_cargo = ?,
            func_salario = ?, func_dataContratacao = ?, func_departamento_id = ?
            WHERE func_codigo = ?`;
      const parametros = [
        funcionario.nome,
        funcionario.cargo,
        funcionario.salario,
        funcionario.dataContratacao,
        funcionario.departamento,
        funcionario.codigo,
      ];

      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(funcionario) {
    if (funcionario instanceof Funcionario) {
      const sql = `DELETE FROM funcionario WHERE func_codigo = ?`;
      const parametros = [funcionario.codigo];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(termo) {
    if (!termo) {
        termo = "";
    }

    const conexao = await conectar();
    let listaFuncionarios = [];

    // Consulta pelo código do funcionário
    if (!isNaN(parseInt(termo))) {
        const sql = `
            SELECT 
                f.func_codigo, f.func_nome, f.func_cargo,
                f.func_salario, f.func_dataContratacao, f.func_departamento_id,
                d.dep_codigo AS departamento_codigo, d.dep_nome AS departamento_nome
            FROM 
                funcionario f
                INNER JOIN departamento d ON f.func_departamento_id = d.dep_codigo
            WHERE 
                f.func_codigo = ?
            ORDER BY 
                f.func_nome
        `;

        const parametros = [termo];
        const [registros, campos] = await conexao.execute(sql, parametros);

        for (const registro of registros) {
            const departamento = new Departamento(registro.departamento_codigo, registro.departamento_nome);
            const funcionario = new Funcionario(
                registro.func_codigo,
                registro.func_nome,
                registro.func_cargo,
                registro.func_salario,
                registro.func_dataContratacao,
                departamento
            );
            listaFuncionarios.push(funcionario);
        }
    } else {
        // Consulta pelo nome do funcionário
        const sql = `
            SELECT 
                f.func_codigo, f.func_nome, f.func_cargo,
                f.func_salario, f.func_dataContratacao, f.func_departamento_id,
                d.dep_codigo AS departamento_codigo, d.dep_nome AS departamento_nome
            FROM 
                funcionario f
                INNER JOIN departamento d ON f.func_departamento_id = d.dep_codigo
            WHERE 
                f.func_nome LIKE ?
            ORDER BY 
                f.func_nome
        `;

        const parametros = ["%" + termo + "%"];
        const [registros, campos] = await conexao.execute(sql, parametros);

        for (const registro of registros) {
            const departamento = new Departamento(registro.departamento_codigo, registro.departamento_nome);
            const funcionario = new Funcionario(
                registro.func_codigo,
                registro.func_nome,
                registro.func_cargo,
                registro.func_salario,
                registro.func_dataContratacao,
                departamento
            );
            listaFuncionarios.push(funcionario);
        }
    }

    return listaFuncionarios; 
}

}
