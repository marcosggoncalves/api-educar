create table permissao(
	id serial primary key,
	nome varchar(255),
	icon varchar(255),
	rota_api varchar(255),
	rota_web varchar(255),
	is_menu boolean default false,
	created_at timestamp default now(),
  	updated_at timestamp default now()
);

create table grupo(
	id serial primary key,
	nome varchar(255),
	created_at timestamp default now(),
  	updated_at timestamp default now()
);

create table grupo_permissao(
	id serial primary key,
	is_selecionado boolean default false,
	permissao_id integer,
	grupo_id integer,
	created_at timestamp default now(),
  	updated_at timestamp default now(),
	foreign key(grupo_id) references grupo(id),
	foreign key(permissao_id) references permissao(id)
);

create table cidade(
	id serial primary key,
	nome varchar(255),
	uf varchar(255),
	created_at timestamp default now(),
  	updated_at timestamp default now()
);

create table instituicao(
	id serial primary key,
	nome varchar(255),
	cidade_id integer,
	created_at timestamp default now(),
  	updated_at timestamp default now(),
	foreign key(cidade_id) references cidade(id)
);

create table usuario(
	id serial primary key,
	nome varchar(255),
	senha varchar(255),
	email varchar(255),
	grupo_id integer,
	tipo_usuario varchar(255),
	instituicao_id integer,
	created_at timestamp default now(),
  	updated_at timestamp default now(),
  	foreign key(grupo_id) references grupo(id),
  	foreign key(instituicao_id) references instituicao(id),
  	unique(email)
);

create table autor(
	id serial primary key,
	nome varchar(255),
	email varchar(255),
	created_at timestamp default now(),
  	updated_at timestamp default now()
);

create table trabalho(
	id serial primary key,
	titulo text,
	documento_url text, 
	documento_url_reenvio text, 
	ultimo_status varchar(255) default 'Aguardando documento',
	usuario_id integer,
	created_at timestamp default now(),
  	updated_at timestamp default now(),

  	foreign key(usuario_id) references usuario(id)
);

create table autor_trabalho(
	id serial primary key,
	trabalho_id integer,
	autor_id integer,
	created_at timestamp default now(),
  	updated_at timestamp default now(),

	foreign key(trabalho_id) references trabalho(id),
	foreign key(autor_id) references autor(id)
);

create table avaliacao(
	id serial primary key,
	trabalho_id integer,
	avaliador_id integer,
	encaminhado_por integer,
	documento_avaliador_url text, 
	nota real,
	justificativa text,
	ultimo_status varchar(255) default 'Aguardando coordenador',
	created_at timestamp default now(),
  	updated_at timestamp default now(),

	foreign key(trabalho_id) references trabalho(id),
	foreign key(avaliador_id) references usuario(id),
	foreign key(encaminhado_por) references usuario(id)
);

INSERT INTO cidade (id, nome, uf) VALUES (1, 'Dourados', 'MS');

INSERT INTO instituicao (id, nome, cidade_id) VALUES (1, 'UEMS - Evento Organização', 1);

INSERT INTO grupo (id, nome) VALUES (1, 'Alunos');
INSERT INTO grupo (id, nome) VALUES (2, 'Coordenação');
INSERT INTO grupo (id, nome) VALUES (3, 'Avaliadores');

INSERT INTO permissao (id, nome, icon, rota_api, rota_web, is_menu) VALUES (1, 'Grupos de permissões', NULL, '/grupos', '/grupos', true);
INSERT INTO permissao (id, nome, icon, rota_api, rota_web, is_menu) VALUES (2, 'Permissões', NULL, '/permissoes', '/permissoes', true);
INSERT INTO permissao (id, nome, icon, rota_api, rota_web, is_menu) VALUES (3, 'Usuários', NULL, '/usuarios', '/usuarios', true);
INSERT INTO permissao (id, nome, icon, rota_api, rota_web, is_menu) VALUES (4, 'Instituições', NULL, '/instituicoes', '/instituicoes', true);
INSERT INTO permissao (id, nome, icon, rota_api, rota_web, is_menu) VALUES (5, 'Cidades', NULL, '/cidades', '/cidades', true);
INSERT INTO permissao (id, nome, icon, rota_api, rota_web, is_menu) VALUES (6, 'Trabalhos Recebidos', NULL, '/trabalhos-recebidos', '/trabalhos-recebidos', true);
INSERT INTO permissao (id, nome, icon, rota_api, rota_web, is_menu) VALUES (7, 'Avaliações encaminhadas', NULL, '/avaliacoes-realizadas', '/avaliacoes-encaminhadas', true);
INSERT INTO permissao (id, nome, icon, rota_api, rota_web, is_menu) VALUES (8, 'Trabalhos sem avaliação', NULL, '/coordenacao-trabalhos', '/trabalhos-para-encaminhamento', true);
INSERT INTO permissao (id, nome, icon, rota_api, rota_web, is_menu) VALUES (9, 'Trabalhos para avaliação', 'mdi-badge-account-horizontal-outline', '/avaliador-trabalhos/', '/avaliacoes', true);
INSERT INTO permissao (id, nome, icon, rota_api, rota_web, is_menu) VALUES (10, 'Submissão de trabalho', 'mdi-send', '/', '/submeter-projeto', true);
INSERT INTO permissao (id, nome, icon, rota_api, rota_web, is_menu) VALUES (11, 'Meus Trabalhos', null, '/meus-trabalhos-submetidos/', '/', false);
-- Permissões do aluno
INSERT INTO grupo_permissao (is_selecionado, permissao_id, grupo_id) VALUES (true, 10, 1);
INSERT INTO grupo_permissao (is_selecionado, permissao_id, grupo_id) VALUES (true, 11, 1);
-- Permissões do coordenação
INSERT INTO grupo_permissao (is_selecionado, permissao_id, grupo_id) VALUES (true, 1, 2);
INSERT INTO grupo_permissao (is_selecionado, permissao_id, grupo_id) VALUES (true, 2, 2);
INSERT INTO grupo_permissao (is_selecionado, permissao_id, grupo_id) VALUES (true, 3, 2);
INSERT INTO grupo_permissao (is_selecionado, permissao_id, grupo_id) VALUES (true, 4, 2);
INSERT INTO grupo_permissao (is_selecionado, permissao_id, grupo_id) VALUES (true, 5, 2);
INSERT INTO grupo_permissao (is_selecionado, permissao_id, grupo_id) VALUES (true, 6, 2);
INSERT INTO grupo_permissao (is_selecionado, permissao_id, grupo_id) VALUES (true, 7, 2);
INSERT INTO grupo_permissao (is_selecionado, permissao_id, grupo_id) VALUES (true, 8, 2);
-- Permissões do avaliador
INSERT INTO grupo_permissao (is_selecionado, permissao_id, grupo_id) VALUES (true, 9, 3);