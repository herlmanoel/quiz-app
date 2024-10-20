-- Conteúdos principais
INSERT INTO conteudo (id, titulo, conteudo_pai_id) VALUES (1, 'Introdução ao AWS', NULL);
INSERT INTO conteudo (id, titulo, conteudo_pai_id) VALUES (2, 'Serviços de Armazenamento', NULL);

-- Subconteúdos relacionados ao conteúdo principal (conteudo_pai_id = 1)
INSERT INTO conteudo (id, titulo, conteudo_pai_id) VALUES (3, 'Amazon S3', 1);
INSERT INTO conteudo (id, titulo, conteudo_pai_id) VALUES (4, 'Amazon EFS', 1);
INSERT INTO conteudo (id, titulo, conteudo_pai_id) VALUES (5, 'Amazon Glacier', 1);

-- Subconteúdos relacionados a "Serviços de Armazenamento" (conteudo_pai_id = 2)
INSERT INTO conteudo (id, titulo, conteudo_pai_id) VALUES (6, 'Opções de Backup', 2);
INSERT INTO conteudo (id, titulo, conteudo_pai_id) VALUES (7, 'Soluções de Arquivamento', 2);

-- Perguntas associadas aos conteúdos
-- Inserindo campos adicionais: proximaRevisao, numeroTentativas, ultimaRevisao, intervaloRevisao, facilidade, estado, ultimaRespostaCorreta, totalRespostasCorretas, totalRespostasIncorretas, ultimaDificuldade

-- Pergunta 1 associada ao conteúdo 'Introdução ao AWS'
INSERT INTO pergunta (id, texto, conteudo_id, proximaRevisao, numeroTentativas, ultimaRevisao, intervaloRevisao, facilidade, estado, ultimaRespostaCorreta, totalRespostasCorretas, totalRespostasIncorretas, ultimaDificuldade) 
VALUES (1, 'O que é a AWS?', 1, '2024-10-11T12:00:00', 0, NULL, 1, 2.5, 'nova', false, 0, 0, 1);

-- Alternativas para a pergunta 1
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (1, 'Uma plataforma de computação em nuvem', true, 1);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (2, 'Um serviço de armazenamento local', false, 1);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (3, 'Um serviço de banco de dados relacional', false, 1);

-- Pergunta 2 associada ao conteúdo 'Introdução ao AWS'
INSERT INTO pergunta (id, texto, conteudo_id, proximaRevisao, numeroTentativas, ultimaRevisao, intervaloRevisao, facilidade, estado, ultimaRespostaCorreta, totalRespostasCorretas, totalRespostasIncorretas, ultimaDificuldade) 
VALUES (2, 'Quais são os principais benefícios da AWS?', 1, '2024-10-11T12:00:00', 0, NULL, 1, 2.5, 'nova', false, 0, 0, 1);

-- Alternativas para a pergunta 2
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (4, 'Escalabilidade, elasticidade, e segurança', true, 2);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (5, 'Baixa flexibilidade e alto custo', false, 2);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (6, 'Apenas para armazenamento de dados', false, 2);

-- Pergunta 3 associada ao conteúdo 'Amazon S3'
INSERT INTO pergunta (id, texto, conteudo_id, proximaRevisao, numeroTentativas, ultimaRevisao, intervaloRevisao, facilidade, estado, ultimaRespostaCorreta, totalRespostasCorretas, totalRespostasIncorretas, ultimaDificuldade) 
VALUES (3, 'O que é o Amazon S3?', 3, '2024-10-11T12:00:00', 0, NULL, 1, 2.5, 'nova', false, 0, 0, 1);

-- Alternativas para a pergunta 3
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (7, 'Um serviço de armazenamento de objetos', true, 3);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (8, 'Um serviço de banco de dados gerenciado', false, 3);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (9, 'Um serviço de computação em nuvem sem servidor', false, 3);

-- Pergunta 4 associada ao conteúdo 'Amazon EFS'
INSERT INTO pergunta (id, texto, conteudo_id, proximaRevisao, numeroTentativas, ultimaRevisao, intervaloRevisao, facilidade, estado, ultimaRespostaCorreta, totalRespostasCorretas, totalRespostasIncorretas, ultimaDificuldade) 
VALUES (4, 'O que é o Amazon EFS?', 4, '2024-10-11T12:00:00', 0, NULL, 1, 2.5, 'nova', false, 0, 0, 1);

-- Alternativas para a pergunta 4
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (10, 'Um sistema de arquivos elástico que usa NFS', true, 4);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (11, 'Um serviço de armazenamento de objetos', false, 4);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (12, 'Um serviço de computação sem servidor', false, 4);

-- Pergunta 5 associada ao conteúdo 'Amazon Glacier'
INSERT INTO pergunta (id, texto, conteudo_id, proximaRevisao, numeroTentativas, ultimaRevisao, intervaloRevisao, facilidade, estado, ultimaRespostaCorreta, totalRespostasCorretas, totalRespostasIncorretas, ultimaDificuldade) 
VALUES (5, 'Para que serve o Amazon Glacier?', 5, '2024-10-11T12:00:00', 0, NULL, 1, 2.5, 'nova', false, 0, 0, 1);

-- Alternativas para a pergunta 5
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (13, 'Armazenamento a longo prazo e baixo custo', true, 5);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (14, 'Execução de funções sem servidor', false, 5);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (15, 'Processamento de dados em tempo real', false, 5);

-- Pergunta 6 associada ao conteúdo 'Opções de Backup'
INSERT INTO pergunta (id, texto, conteudo_id, proximaRevisao, numeroTentativas, ultimaRevisao, intervaloRevisao, facilidade, estado, ultimaRespostaCorreta, totalRespostasCorretas, totalRespostasIncorretas, ultimaDificuldade) 
VALUES (6, 'Quais são as principais opções de backup na AWS?', 6, '2024-10-11T12:00:00', 0, NULL, 1, 2.5, 'nova', false, 0, 0, 1);

-- Alternativas para a pergunta 6
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (16, 'Amazon S3, EFS e Glacier', true, 6);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (17, 'Apenas Amazon RDS', false, 6);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (18, 'Amazon EC2 e Lambda', false, 6);

-- Pergunta 7 associada ao conteúdo 'Soluções de Arquivamento'
INSERT INTO pergunta (id, texto, conteudo_id, proximaRevisao, numeroTentativas, ultimaRevisao, intervaloRevisao, facilidade, estado, ultimaRespostaCorreta, totalRespostasCorretas, totalRespostasIncorretas, ultimaDificuldade) 
VALUES (7, 'Qual serviço AWS é recomendado para arquivamento?', 7, '2024-10-11T12:00:00', 0, NULL, 1, 2.5, 'nova', false, 0, 1, 1);

-- Alternativas para a pergunta 7
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (19, 'Amazon Glacier', true, 7);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (20, 'Amazon EC2', false, 7);
INSERT INTO alternativa (id, texto, correta, pergunta_id) VALUES (21, 'Amazon S3 Standard', false, 7);
