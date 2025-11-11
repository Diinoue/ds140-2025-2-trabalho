DROP DATABASE IF EXISTS CRUDS;
CREATE DATABASE CRUDS;

CREATE TYPE tipo AS ENUM ('funcionario','cliente');
CREATE TYPE estado AS ENUM ('ABERTA','ORCADA','REJEITADA','APROVADA','REDIRECIONADA','ARRUMADA','PAGA','FINALIZADA');

CREATE TABLE tb_funcionario (
    id_func SERIAL PRIMARY KEY,
    email_func VARCHAR(30) UNIQUE NOT NULL,
    nome_func VARCHAR(30) NOT NULL,
    dataNasc_func DATE NOT NULL, 
    senha_func VARCHAR(60) NOT NULL,
    rota_func tipo NOT NULL
);
CREATE TABLE tb_cliente (
    cpf_cli CHAR(11) PRIMARY KEY,
    nome_cli VARCHAR(30) NOT NULL,
    email_cli VARCHAR(30) UNIQUE NOT NULL,
    cep_cli VARCHAR(10) NOT NULL, 
    senha_cli VARCHAR(60) NOT NULL,
    telefone_cli VARCHAR(20) NOT NULL,
    endereco_cli VARCHAR(100) NOT NULL,
    rota_cliente tipo NOT NULL
);

CREATE TABLE tb_equipamento (
    id_equip SERIAL PRIMARY KEY,
    nome_equip VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE tb_solicitacao (
    id_soli SERIAL PRIMARY KEY,
    nome_soli VARCHAR(50) NOT NULL,
    dt_inicio TIMESTAMP NOT NULL DEFAULT NOW(),
    dt_pagamento DATE,
    desc_soli TEXT NOT NULL,
    estado_soli estado NOT NULL DEFAULT 'ABERTA',
    valor_soli NUMERIC(10,2),
    cliente_soli CHAR(11) NOT NULL,
    funcionario_soli INTEGER,
    orientacoe_soli TEXT NOT NULL,
    eletronico_soli INTEGER NOT NULL,
    FOREIGN KEY (cliente_soli) REFERENCES tb_cliente(cpf_cli),
    FOREIGN KEY (funcionario_soli) REFERENCES tb_funcionario(id_func),
    FOREIGN KEY (eletronico_soli) REFERENCES tb_equipamento(id_equip)
);

CREATE TABLE tb_historico (
    id_hist SERIAL PRIMARY KEY,
    soli_hist INT NOT NULL,
    func_hist INT NOT NULL,
    descricao TEXT NOT NULL,
    dt_registro TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (soli_hist) REFERENCES tb_solicitacao(id_soli),
    FOREIGN KEY (func_hist) REFERENCES tb_funcionario(id_func)
);

INSERT INTO tb_funcionario (email_func, nome_func, dataNasc_func, senha_func, rota_func)
VALUES
('maria@gmail.com', 'Maria', '1990-03-11', '1234', 'funcionario'),
('mario@gmail.com', 'Mário', '1988-10-20', '1234', 'funcionario');

INSERT INTO tb_cliente (cpf_cli, nome_cli, email_cli, cep_cli, senha_cli, telefone_cli, endereco_cli, rota_cliente)
VALUES
('74908798095', 'João', 'joao@gmail.com', '68374270', '1234', '63987768979', 'Rua Abrão dos Santos, 10', 'cliente'),
('73641938040', 'José', 'jose@gmail.com', '75903412', '1234', '66984324569', 'Rua Buscador Faria, 21', 'cliente'),
('96358693042', 'Joana', 'joana@gmail.com', '23916130', '1234', '27987491438', 'Rua CLovis da silva, 32', 'cliente'),
('50367476070', 'Joaquina', 'joaquina@gmail.com', '117048017', '1234', '64991064251', 'Rua Dasmasco Silvanio, 43', 'cliente');

INSERT INTO tb_equipamento (nome_equip)
VALUES ('Notebook'),
       ('Desktop'),
       ('Impressora'),
       ('Mouse'),
       ('Teclado');
