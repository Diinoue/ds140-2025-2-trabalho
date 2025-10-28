drop table tb_funcionario;
create table tb_funcionario (
id_func integer primary key generated always as identity,    
email_func varchar (10) not null,
nome_func varchar (30) not null,
dataNasc_func varchar (10) not null, 
senha_func varchar (10) not null 
)

drop table tb_cliente;
create table tb_cliente(
id_cli integer primary key generated always as identity,    
nome_cli varchar (30) not null,
email_cli varchar (10) not null,
cep_cli varchar (10) not null, 
senha_func char (4) not null,
telefone_cli varchar (10) not null,
endereco_cli varchar (15) not null
)

drop table tb_cliente;
create table tb_cliente(
id_cli integer primary key generated always as identity,    
nome_cli varchar (30) not null,
email_cli varchar (10) not null,
cep_cli varchar (10) not null, 
senha_func char (4) not null,
telefone_cli varchar (10) not null,
endereco_cli varchar (15) not null
)

drop table tb_equipamento;
create table tb_equipamento(
id_equip integer primary key generated always as identity,    
nome_equip varchar (15) not null
)

