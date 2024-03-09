CREATE DATABASE backendaluno22pfsii;

USE backendaluno22pfsii;

-- Um para muitos

CREATE TABLE departamento ( --SERIA A CATEGORIA
    dep_codigo INT NOT NULL AUTO_INCREMENT,
    dep_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_departamento PRIMARY KEY(dep_codigo)
);

CREATE TABLE funcionario ( --PRODUTO
    func_codigo INT NOT NULL AUTO_INCREMENT,
    func_nome VARCHAR(100) NOT NULL,
    func_cargo VARCHAR(100) NOT NULL,
    func_salario DECIMAL(10,2) NOT NULL DEFAULT 0,
    func_dataContratacao DATE,
    func_departamento_id INT NOT NULL,
    CONSTRAINT pk_funcionario PRIMARY KEY(func_codigo),
    CONSTRAINT fk_departamento FOREIGN KEY (func_departamento_id) REFERENCES departamento(dep_codigo)
);

-- Muitos para muitos

CREATE TABLE cliente (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);


-- Tabela para armazenar as ordens de serviço
CREATE TABLE ordem_de_servico (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    cliente_codigo INT,
    total DECIMAL(10, 2) NOT NULL,
    data_ordem TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_CLIENTE FOREIGN KEY (cliente_codigo) REFERENCES cliente(codigo)
);

-- Tabela para armazenar os itens das ordens de serviço
CREATE TABLE item_ordem_de_servico (
    ordem_de_servico_codigo INT NOT NULL,
    func_codigo INT NOT NULL,
    descricao_os VARCHAR(255) NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (ordem_de_servico_codigo, func_codigo),
    CONSTRAINT FK_ORD_DE_SERV FOREIGN KEY (ordem_de_servico_codigo) REFERENCES ordem_de_servico(codigo),
    CONSTRAINT FK_FUNCIONARIO FOREIGN KEY (func_codigo) REFERENCES funcionario(func_codigo)
);