    DROP DATABASE  CRUDS;
    CREATE DATABASE CRUDS;

    CREATE TYPE tipo AS ENUM ('funcionario','cliente');
    CREATE TYPE estado AS ENUM ('ABERTA','ORCADA','REJEITADA','APROVADA','REDIRECIONADA','ARRUMADA','PAGA','FINALIZADA');


    DROP TABLE if EXISTS tb_funcionario;
    CREATE TABLE tb_funcionario (
        id_func SERIAL PRIMARY KEY,
        email_func VARCHAR(30) UNIQUE NOT NULL,
        nome_func VARCHAR(30) NOT NULL,
        dataNasc_func DATE NOT NULL, 
        senha_func VARCHAR(60) NOT NULL,
        ativo_func BOOLEAN DEFAULT TRUE,
        rota_func tipo NOT NULL
    );
    DROP TABLE if EXISTS tb_cliente;
    CREATE TABLE tb_cliente (
        id_cli SERIAL PRIMARY KEY,
        cpf_cli CHAR(11) UNIQUE NOT NULL,
        nome_cli VARCHAR(30) NOT NULL,
        email_cli VARCHAR(30) UNIQUE NOT NULL,
        cep_cli VARCHAR(10) NOT NULL, 
        senha_cli VARCHAR(60) NOT NULL,
        telefone_cli VARCHAR(20) NOT NULL,
        endereco_cli VARCHAR(100) NOT NULL,
        ativo_cli BOOLEAN DEFAULT TRUE,
        rota_cli tipo NOT NULL
    );
    DROP TABLE if EXISTS tb_equipamento;
    CREATE TABLE tb_equipamento (
        id_equip SERIAL PRIMARY KEY,
         ativo_equip BOOLEAN DEFAULT TRUE,
        nome_equip VARCHAR(50) UNIQUE NOT NULL
    );

    DROP TABLE if EXISTS tb_solicitacao;
    CREATE TABLE tb_solicitacao (
        id_soli SERIAL PRIMARY KEY,
        nome_soli VARCHAR(50) NOT NULL,
        dt_inicio TIMESTAMP NOT NULL DEFAULT NOW(),
        desc_soli TEXT NOT NULL,
        estado_soli estado NOT NULL DEFAULT 'ABERTA',
        valor_soli NUMERIC(10,2),
        cliente_soli CHAR(11) NOT NULL,
        funcionario_soli INTEGER,
        orientacoe_soli TEXT NOT NULL,
        eletronico_soli INTEGER NOT NULL,
        ativo_soli BOOLEAN DEFAULT TRUE,
        FOREIGN KEY (cliente_soli) REFERENCES tb_cliente(cpf_cli),
        FOREIGN KEY (funcionario_soli) REFERENCES tb_funcionario(id_func),
        FOREIGN KEY (eletronico_soli) REFERENCES tb_equipamento(id_equip)
    );

    DROP TABLE if EXISTS tb_historico;
    CREATE TABLE tb_historico (
        id_hist SERIAL PRIMARY KEY,
        soli_hist INT NOT NULL,
        func_hist INT NOT NULL,
        dt_registro TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (soli_hist) REFERENCES tb_solicitacao(id_soli),
        FOREIGN KEY (func_hist) REFERENCES tb_funcionario(id_func)
    );

    DROP TABLE if EXISTS tb_pagamento;
    CREATE TABLE tb_pagamento (
        id_pag SERIAL PRIMARY KEY,
        soli_pag INT NOT NULL,
        valor_pag NUMERIC(10,2) NOT NULL,
        forma_pag VARCHAR(20) NOT NULL, 
        dt_pagamento TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (soli_pag) REFERENCES tb_solicitacao(id_soli)
    );

    INSERT INTO tb_funcionario (email_func, nome_func, dataNasc_func, senha_func, rota_func)
    VALUES
    ('maria@gmail.com', 'Maria', '1990-03-11', '1234', 'funcionario'),
    ('mario@gmail.com', 'Mário', '1988-10-20', '1234', 'funcionario');

    INSERT INTO tb_cliente (cpf_cli, nome_cli, email_cli, cep_cli, senha_cli, telefone_cli, endereco_cli, rota_cli)
    VALUES
    ('74908798095', 'João', 'joaoa@gmail.com', '68374270', '1234', '63987768979', 'Rua Abrão dos Santos, 10', 'cliente'),
    ('73641938040', 'José', 'josee@gmail.com', '75903412', '1234', '66984324569', 'Rua Buscador Faria, 21', 'cliente'),
    ('96358693042', 'Joana', 'joanaa@gmail.com', '23916130', '1234', '27987491438', 'Rua CLovis da silva, 32', 'cliente'),
    ('50367476070', 'Joaquina', 'joaquinaa@gmail.com', '117048017', '1234', '64991064251', 'Rua Dasmasco Silvanio, 43', 'cliente');

    INSERT INTO tb_equipamento (nome_equip)
    VALUES ('Notebook'),
        ('Desktop'),
        ('Impressora'),
        ('Mouse'),
        ('Teclado');

INSERT INTO tb_solicitacao 
(nome_soli, desc_soli, valor_soli, cliente_soli, funcionario_soli, orientacoe_soli, eletronico_soli)
VALUES
('Troca de Tela Notebook',
 'Notebook caiu no chão e quebrou a tela. Cliente solicita orçamento de troca.',
 350.00,
 '74908798095', 
 1, 
 'Cliente deseja tela original e prazo máximo de 5 dias.',
 1);

INSERT INTO tb_solicitacao 
(nome_soli, desc_soli, valor_soli, cliente_soli, funcionario_soli, orientacoe_soli, eletronico_soli)
VALUES
('Formatação Completa',
 'Computador muito lento, precisa formatação e backup dos arquivos.',
 180.00,
 '73641938040', 
 2, 
 'Lembrar de salvar a pasta Documentos antes da formatação.',
 2);

INSERT INTO tb_solicitacao 
(nome_soli, desc_soli, valor_soli, cliente_soli, funcionario_soli, orientacoe_soli, eletronico_soli)
VALUES
('Impressora não puxa papel',
 'Impressora apresenta falha no alimentador de papel.',
 120.00,
 '96358693042', 
 1, 
 'Cliente pede limpeza geral e troca do rolete se necessário.',
 3);

INSERT INTO tb_solicitacao 
(nome_soli, desc_soli, valor_soli, cliente_soli, funcionario_soli, orientacoe_soli, eletronico_soli)
VALUES
('Mouse desconectando',
 'Mouse sem fio desconecta frequentemente. Possível defeito na placa USB.',
 50.00,
 '50367476070', 
 null, 
 'Aguardar diagnóstico antes de aprovar serviço.',
 4);

INSERT INTO tb_solicitacao 
(nome_soli, desc_soli, valor_soli, cliente_soli, funcionario_soli, orientacoe_soli, eletronico_soli)
VALUES
('Teclado com teclas falhando',
 'Teclas importantes do teclado não funcionam, provável oxidação.',
 70.00,
 '74908798095', 
 2, 
 'Cliente autorizou troca do teclado caso necessário.',
 5);


SELECT * from endereco;