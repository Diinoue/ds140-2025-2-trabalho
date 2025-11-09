Drop database CRUDS;
create database CRUDS;
use CRUDS;

drop table tb_funcionario;
create type tipo as  enum ('funcionario','cliente');
create table tb_funcionario (
id_func integer primary key generated always as identity,    
email_func varchar (30) unique not null,
nome_func varchar (30) not null,
dataNasc_func char (10) not null, 
senha_func varchar (10) not null, 
rota_func tipo 
)

drop table tb_cliente;
create table tb_cliente(
cpf_cli char (11) primary key not null,
nome_cli varchar (30) not null,
email_cli varchar (30)  unique not null,
cep_cli varchar (10) not null, 
senha_func char (4) not null,
telefone_cli char (12) not null,
endereco_cli varchar (15) not null,
rota_cliente tipo not null
)

drop table tb_equipamento;
create table tb_equipamento(
id_equip integer primary key generated always as identity,    
nome_equip varchar (15) unique not null 
)

-- Acho possível criar uma tabela só para histórico de func. Outra coisa que pode ser que mude é criar uma tabela apenas para pagamento.
drop table tb_solicitacao;
id_soli integer primary key generated always as identity,    
create type  estado as  enum ('ABERTA','ORCADA','REJEITADA','APROVADA','REDIRECIONADA','ARRUMADA','PAGA','FINALIZADA');
create table tb_solicitacao(
nome_soli varchar(20) not null,
dt_inicio char(10) not null,
dt_pagamento char(10),
desc_soli text (50) not null,
estado_soli estado not null, 
histfunc_soli  text [],
valor_soli float,
cliente_soli  integer not null,
funcionario_soli integer not null,
orientacoe_soli text not null,
eletronico_soli int not null,
FOREIGN KEY (cliente_soli) REFERENCES cliente (id_cli),
FOREIGN KEY (func_soli) REFERENCES funcionario (id_func),
FOREIGN KEY (eletronico_soli) REFERENCES tb_equipamento (id_equip)
)



