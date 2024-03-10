import OrdemDeServico from "../Modelo/ordem_Servico.js";
import Cliente from "../Modelo/Cliente.js";
import Funcionario from "../Modelo/Funcionario.js";
import ItemOrdemDeServico from "../Modelo/Item_Os.js";
import conectar from "./conexao.js";

export default class OrdemDeServicoDAO {
  async gravar(ordemDeServico) {
    if (ordemDeServico instanceof OrdemDeServico) {
      const conexao = await conectar();
      await conexao.beginTransaction();
      try {
        const sql =
          'INSERT INTO ordem_de_servico(cliente_codigo, data_ordem, total) VALUES(?,str_to_date(?,"%d/%m/%Y"),?)';
        const parametros = [
          ordemDeServico.cliente.codigo,
          ordemDeServico.dataOrdem,
          ordemDeServico.total,
        ];
        const retorno = await conexao.execute(sql, parametros);
        ordemDeServico.codigo = retorno[0].insertId;
        
        const sql2 =
          "INSERT INTO item_ordem_de_servico(ordem_de_servico_codigo, func_codigo, descricao_os, preco_unitario) VALUES(?, ?, ?, ?)";
        for (const item of ordemDeServico.itens) {
          let parametros2 = [
            ordemDeServico.codigo,
            item.funcionarioCodigo.codigo,
            item.descricaoOS,
            item.precoUnitario,
          ];
          await conexao.execute(sql2, parametros2);
        }
        await conexao.commit();
      } catch (error) {
        await conexao.rollback();
        throw error;
      }
    }
  }

  async excluir(ordemDeServico) {
    if (!ordemDeServico.codigo) {
      throw new Error("Ordem de serviço não possui código válido.");
    }

    try {
      const conexao = await conectar();
      await conexao.execute("DELETE FROM ordem_de_servico WHERE codigo = ?", [
        ordemDeServico.codigo,
      ]);
    } catch (error) {
      throw new Error(`Erro ao excluir a ordem de serviço: ${error.message}`);
    }
  }

  async alterar(ordemDeServico) {
    if (!ordemDeServico.codigo) {
        throw new Error("Ordem de serviço não possui código válido.");
    }

    try {
        const conexao = await conectar();
        await conexao.beginTransaction();

        await conexao.execute(
            "UPDATE ordem_de_servico SET cliente_codigo = ?, total = ?, data_ordem = ? WHERE codigo = ?",
            [
                ordemDeServico.cliente.codigo,
                ordemDeServico.total,
                ordemDeServico.dataOrdem,
                ordemDeServico.codigo,
            ]
        );

        await conexao.execute(
            "DELETE FROM item_ordem_de_servico WHERE ordem_de_servico_codigo = ?",
            [ordemDeServico.codigo]
        );

        for (const item of ordemDeServico.itens) {
            await conexao.execute(
                "INSERT INTO item_ordem_de_servico(ordem_de_servico_codigo, func_codigo, descricao_os, preco_unitario) VALUES (?, ?, ?, ?)",
                [
                    ordemDeServico.codigo,
                    item.funcionarioCodigo.codigo,
                    item.descricaoOS,
                    item.precoUnitario
                ]
            );
        }
        await conexao.commit();
    } catch (error) {
        // Rollback da transação em caso de erro
        await conexao.rollback();
        throw new Error(`Erro ao alterar a ordem de serviço: ${error.message}`);
    }
}


  async consultar(termoBusca) {
    if (isNaN(termoBusca)) {
      return [];
    }

    try {
      const conexao = await conectar();
      const consultarSQL = `
        SELECT os.codigo, os.cliente_codigo, os.data_ordem, os.total,
                c.nome AS cliente_nome, c.endereco AS cliente_endereco, c.telefone AS cliente_telefone,
                ios.descricao_os, ios.preco_unitario, 
                f.func_codigo, f.func_nome, f.func_cargo, f.func_salario, f.func_dataContratacao, f.func_departamento_id
        FROM ordem_de_servico AS os
        INNER JOIN cliente AS c ON os.cliente_codigo = c.codigo
        INNER JOIN item_ordem_de_servico AS ios ON ios.ordem_de_servico_codigo = os.codigo
        INNER JOIN funcionario AS f ON ios.func_codigo = f.func_codigo
        WHERE os.codigo = ?`;
      const [registros, campos] = await conexao.execute(consultarSQL, [
        termoBusca,
      ]);

      const listaOrdensDeServico = registros.map((registro) => {
        const cliente = new Cliente(
          registro.cliente_codigo,
          registro.cliente_nome,
          registro.cliente_telefone,
          registro.cliente_endereco
        );

        const listaItensOrdemDeServico = registros.map((registro) => {
          const funcionario = new Funcionario(
            registro.func_codigo,
            registro.func_nome,
            registro.func_cargo,
            registro.func_salario,
            registro.func_dataContratacao,
            registro.func_departamento_id
          );

          return new ItemOrdemDeServico(
            funcionario,
            registro.descricao_os,
            registro.preco_unitario
          );
        });

        return new OrdemDeServico(
          registro.codigo,
          cliente,
          registro.data_ordem,
          registro.total,
          listaItensOrdemDeServico
        );
      });

      return listaOrdensDeServico;
    } catch (error) {
      console.error("Erro ao consultar a ordem de serviço:", error.message);
      throw error;
    }
  }
}
