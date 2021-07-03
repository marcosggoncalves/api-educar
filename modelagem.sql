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

INSERT INTO public.cidade (id, nome, uf, created_at, updated_at) VALUES (1, 'Dourados', 'MS', '2021-07-01 19:22:26', '2021-07-01 19:22:26');

INSERT INTO public.instituicao (id, nome, cidade_id, created_at, updated_at) VALUES (1, 'UEMS - Evento Organização', 1, '2021-07-01 19:22:33', '2021-07-01 19:22:33');

INSERT INTO public.grupo (id, nome, created_at, updated_at) VALUES (1, 'Alunos', '2021-07-01 19:19:41', '2021-07-01 19:19:41');
INSERT INTO public.grupo (id, nome, created_at, updated_at) VALUES (2, 'Coordenação', '2021-07-01 19:19:53', '2021-07-01 19:19:53');
INSERT INTO public.grupo (id, nome, created_at, updated_at) VALUES (3, 'Avaliadores', '2021-07-01 19:20:00', '2021-07-01 19:20:00');

INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (8, 'Grupos de permissões', NULL, '/grupos', '/grupos', true, '2021-07-01 19:34:08', '2021-07-01 19:34:08');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (15, 'Meus Trabalhos', NULL, '/meus-trabalhos-submetidos/', '/meus-trabalhos-submetidos/', true, '2021-07-01 19:38:27', '2021-07-01 19:38:27');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (16, 'Visualizar trabalho', NULL, '/visualizar-trabalho/', '/visualizar-trabalho/', false, '2021-07-01 19:39:16', '2021-07-01 19:39:16');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (17, 'Visualizar trabalho', NULL, '/visualizar-trabalho-detalhado/', '/visualizar-trabalho-detalhado/', false, '2021-07-01 19:39:33', '2021-07-01 19:39:33');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (6, 'Permissões', NULL, '/permissoes', '/permissoes', true, '2021-07-01 19:33:08', '2021-07-01 19:33:08');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (7, 'Usuários', NULL, '/usuarios', '/usuarios', true, '2021-07-01 19:33:50', '2021-07-01 19:33:50');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (9, 'Instituições', NULL, '/instituicoes', '/instituicoes', true, '2021-07-01 19:34:43', '2021-07-01 19:34:43');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (10, 'Cidades', NULL, '/cidades', '/cidades', true, '2021-07-01 19:34:56', '2021-07-01 19:34:56');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (11, 'Autores cadastrados', NULL, '/autores', '/autores', true, '2021-07-01 19:35:06', '2021-07-01 19:35:06');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (12, 'Trabalhos Recebidos', NULL, '/trabalhos-recebidos', '/trabalhos-recebidos', true, '2021-07-01 19:36:49', '2021-07-01 19:36:49');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (13, 'Trabalhos sem avaliadores', NULL, '/coordenacao-trabalhos', '/coordenacao-trabalhos', true, '2021-07-01 19:37:14', '2021-07-01 19:37:14');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (18, 'Avaliações realizadas', NULL, '/avaliacoes-realizadas', '/avaliacoes-realizadas', true, '2021-07-01 19:56:17', '2021-07-01 19:56:17');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (14, 'Trabalhos para avaliação', NULL, '/avaliador-trabalhos/', '/avaliador-trabalhos/', false, '2021-07-01 19:38:09', '2021-07-01 19:38:09');
INSERT INTO public.permissao (id, nome, icon, rota_api, rota_web, is_menu, created_at, updated_at) VALUES (19, 'Submissão de trabalho', NULL, '/', '/', true, '2021-07-01 19:38:09', '2021-07-01 19:38:09');

INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (53, false, 18, 2, '2021-07-01 19:56:17.867578', '2021-07-01 19:56:17.867578');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (52, false, 18, 1, '2021-07-01 19:56:17.867578', '2021-07-01 19:56:17.867578');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (16, false, 6, 1, '2021-07-01 19:33:08.743859', '2021-07-01 19:33:08.743859');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (19, false, 7, 1, '2021-07-01 19:33:50.423305', '2021-07-01 19:33:50.423305');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (22, false, 8, 1, '2021-07-01 19:34:08.521174', '2021-07-01 19:34:08.521174');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (25, false, 9, 1, '2021-07-01 19:34:43.514011', '2021-07-01 19:34:43.514011');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (28, false, 10, 1, '2021-07-01 19:34:56.882222', '2021-07-01 19:34:56.882222');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (17, true, 6, 2, '2021-07-01 19:33:08.743859', '2021-07-01 19:33:08.743859');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (20, true, 7, 2, '2021-07-01 19:33:50.423305', '2021-07-01 19:33:50.423305');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (23, true, 8, 2, '2021-07-01 19:34:08.521174', '2021-07-01 19:34:08.521174');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (26, true, 9, 2, '2021-07-01 19:34:43.514011', '2021-07-01 19:34:43.514011');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (29, true, 10, 2, '2021-07-01 19:34:56.882222', '2021-07-01 19:34:56.882222');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (32, true, 11, 2, '2021-07-01 19:35:06.366441', '2021-07-01 19:35:06.366441');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (35, true, 12, 2, '2021-07-01 19:36:49.234144', '2021-07-01 19:36:49.234144');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (38, true, 13, 2, '2021-07-01 19:37:14.580323', '2021-07-01 19:37:14.580323');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (41, true, 14, 2, '2021-07-01 19:38:09.461498', '2021-07-01 19:38:09.461498');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (44, true, 15, 2, '2021-07-01 19:38:27.805679', '2021-07-01 19:38:27.805679');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (47, true, 16, 2, '2021-07-01 19:39:16.129876', '2021-07-01 19:39:16.129876');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (50, true, 17, 2, '2021-07-01 19:39:33.605295', '2021-07-01 19:39:33.605295');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (31, false, 11, 1, '2021-07-01 19:35:06.366441', '2021-07-01 19:35:06.366441');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (34, false, 12, 1, '2021-07-01 19:36:49.234144', '2021-07-01 19:36:49.234144');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (37, false, 13, 1, '2021-07-01 19:37:14.580323', '2021-07-01 19:37:14.580323');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (40, false, 14, 1, '2021-07-01 19:38:09.461498', '2021-07-01 19:38:09.461498');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (46, false, 16, 1, '2021-07-01 19:39:16.129876', '2021-07-01 19:39:16.129876');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (49, false, 17, 1, '2021-07-01 19:39:33.605295', '2021-07-01 19:39:33.605295');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (54, false, 18, 3, '2021-07-01 19:56:17.867578', '2021-07-01 19:56:17.867578');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (18, false, 6, 3, '2021-07-01 19:33:08.743859', '2021-07-01 19:33:08.743859');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (21, false, 7, 3, '2021-07-01 19:33:50.423305', '2021-07-01 19:33:50.423305');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (24, false, 8, 3, '2021-07-01 19:34:08.521174', '2021-07-01 19:34:08.521174');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (27, false, 9, 3, '2021-07-01 19:34:43.514011', '2021-07-01 19:34:43.514011');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (30, false, 10, 3, '2021-07-01 19:34:56.882222', '2021-07-01 19:34:56.882222');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (33, false, 11, 3, '2021-07-01 19:35:06.366441', '2021-07-01 19:35:06.366441');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (36, false, 12, 3, '2021-07-01 19:36:49.234144', '2021-07-01 19:36:49.234144');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (39, false, 13, 3, '2021-07-01 19:37:14.580323', '2021-07-01 19:37:14.580323');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (45, false, 15, 3, '2021-07-01 19:38:27.805679', '2021-07-01 19:38:27.805679');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (48, false, 16, 3, '2021-07-01 19:39:16.129876', '2021-07-01 19:39:16.129876');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (51, false, 17, 3, '2021-07-01 19:39:33.605295', '2021-07-01 19:39:33.605295');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (42, true, 14, 3, '2021-07-01 19:38:09.461498', '2021-07-01 19:38:09.461498');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (43, true, 15, 1, '2021-07-01 19:38:27.805679', '2021-07-01 19:38:27.805679');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (43, true, 19, 1, '2021-07-01 19:38:27.805679', '2021-07-01 19:38:27.805679');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (43, false, 19, 2, '2021-07-01 19:38:27.805679', '2021-07-01 19:38:27.805679');
INSERT INTO public.grupo_permissao (id, is_selecionado, permissao_id, grupo_id, created_at, updated_at) VALUES (43, false, 19, 3, '2021-07-01 19:38:27.805679', '2021-07-01 19:38:27.805679');
