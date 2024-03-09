import Cliente from "../Modelo/Cliente.js";
import OrdemDeServico from "../Modelo/ordem_Servico.js";
import Funcionario from "../Modelo/Funcionario.js";
import ItemOrdemDeServico from "../Modelo/Item_Os.js";

export default class OrdemDeServicoCtrl {
    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            try {
                const dados = requisicao.body;
                
                const cliente = dados.cliente;
                const dataOrdem = dados.dataOrdem;
                const total = dados.total;
                const itensOrdemDeServico = dados.itensOrdemDeServico;
                
               
                const objCliente = new Cliente(cliente.codigo);

                
                let itens = [];
                for (const item of itensOrdemDeServico) {
                   
                    const funcionario = new Funcionario(item.funcionario.codigo);
             
                    const objItem = new ItemOrdemDeServico(funcionario, item.descricaoOs, item.precoUnitario);
                    itens.push(objItem);
                }

      
                const ordemDeServico = new OrdemDeServico(cliente.codigo, objCliente, dataOrdem, total, itens);

      
                await ordemDeServico.gravar();

                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Ordem de serviço registrada com sucesso!",
                    "codigo": ordemDeServico.codigo
                });
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao registrar a ordem de serviço: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'GET') {
            let termo = requisicao.params.termo;
            if (!isNaN(termo)) {
                try {
                    const ordemDeServico = new OrdemDeServico(0);
                    const listaOrdensDeServico = await ordemDeServico.consultar(termo);
                    resposta.status(200).json({
                        "status": true,
                        "listaOrdensDeServico": listaOrdensDeServico
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar a ordem de serviço: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe um código de ordem de serviço válido!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            });
        }
    }
}


// import Cliente from "../Modelo/Cliente.js";
// import OrdemDeServico from "../Modelo/ordem_Servico.js";
// import Funcionario from "../Modelo/Funcionario.js";
// import ItemOrdemDeServico from "../Modelo/Item_Os.js";

// export default class OrdemDeServicoCtrl {
//     async gravar(requisicao, resposta) {
//         resposta.type('application/json');
//         if (requisicao.method === 'POST' && requisicao.is('application/json')) {
//             try {
//                 const dados = requisicao.body;
    
//                 // Verificar se o cliente está presente na requisição e tem um código válido
//                 if (!dados.cliente || !dados.cliente.codigo) {
//                     resposta.status(400).json({
//                         "status": false,
//                         "mensagem": "Cliente não fornecido ou inválido!"
//                     });
//                     return;
//                 }
    
//                 // Extrair os dados do cliente
//                 const { codigo } = dados.cliente;
    
//                 // Instanciar o cliente
//                 const cliente = new Cliente(codigo);
    
//                 // Extrair os demais dados da ordem de serviço
//                 const { dataOrdem, total, itensOrdemDeServico } = dados;
    
//                 // Processar os itens da ordem de serviço
//                 const itens = [];
//                 for (const item of itensOrdemDeServico) {
//                     const { funcionario, descricaoOs, precoUnitario } = item;
//                     const funcionarioObj = new Funcionario(funcionario.codigo);
//                     const objItem = new ItemOrdemDeServico(funcionarioObj, descricaoOs, precoUnitario);
//                     itens.push(objItem);
//                 }
    
//                 // Instanciar a ordem de serviço
//                 const ordemDeServico = new OrdemDeServico(0, cliente, dataOrdem, total, itens);
    
//                 // Gravar a ordem de serviço
//                 await ordemDeServico.gravar();
    
//                 resposta.status(200).json({
//                     "status": true,
//                     "mensagem": "Ordem de serviço registrada com sucesso!",
//                     "codigo": ordemDeServico.codigo
//                 });
//             } catch (erro) {
//                 resposta.status(500).json({
//                     "status": false,
//                     "mensagem": "Erro ao registrar a ordem de serviço: " + erro.message
//                 });
//             }
//         } else {
//             resposta.status(400).json({
//                 "status": false,
//                 "mensagem": "Requisição inválida!"
//             });
//         }
//     }
    

//     async consultar(requisicao, resposta) {
//         resposta.type('application/json');
//         if (requisicao.method === 'GET') {
//             let termo = requisicao.params.termo;
//             if (!isNaN(termo)) {
//                 try {
//                     const ordemDeServico = new OrdemDeServico(0);
//                     const listaOrdensDeServico = await ordemDeServico.consultar(termo);
//                     resposta.status(200).json({
//                         "status": true,
//                         "listaOrdensDeServico": listaOrdensDeServico
//                     });
//                 } catch (erro) {
//                     resposta.status(500).json({
//                         "status": false,
//                         "mensagem": "Erro ao consultar a ordem de serviço: " + erro.message
//                     });
//                 }
//             } else {
//                 resposta.status(400).json({
//                     "status": false,
//                     "mensagem": "Por favor, informe um código de ordem de serviço válido!"
//                 });
//             }
//         } else {
//             resposta.status(400).json({
//                 "status": false,
//                 "mensagem": "Requisição inválida!"
//             });
//         }
//     }
// }
