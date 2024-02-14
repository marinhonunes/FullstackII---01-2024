CREATE DATABASE backendaluno22pfsii;

USE backendaluno22pfsii;

CREATE TABLE departamento (
    dep_codigo INT NOT NULL AUTO_INCREMENT,
    dep_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_departamento PRIMARY KEY(dep_codigo)
);

CREATE TABLE funcionario (
    func_codigo INT NOT NULL AUTO_INCREMENT,
    func_nome VARCHAR(100) NOT NULL,
    func_cargo VARCHAR(100) NOT NULL,
    func_salario DECIMAL(10,2) NOT NULL DEFAULT 0,
    func_dataContratacao DATE,
    func_departamento_id INT NOT NULL,
    CONSTRAINT pk_funcionario PRIMARY KEY(func_codigo),
    CONSTRAINT fk_departamento FOREIGN KEY (func_departamento_id) REFERENCES departamento(dep_codigo)
);