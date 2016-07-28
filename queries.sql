-- Chart 1
SELECT ano AS x, sum(valor) AS y
	FROM aposentadoria
	WHERE valor > 0
	GROUP BY ano
	ORDER BY ano;

--Chart 2
SELECT acidentes.ano AS x, sum(quantidade) AS y, motivo.descricao as label
	FROM acidentesmotivosituacao
	INNER JOIN motivo ON acidentesmotivosituacao.motivoID = motivo.id
	INNER JOIN acidentespopulacao ON acidentesmotivosituacao.acidentespopulacaoID = acidentespopulacao.id
	INNER JOIN acidentes ON acidentespopulacao.acidentesID = acidentes.id
	GROUP BY acidentespopulacao.acidentesID, motivo.descricao;

--Chart 3
SELECT ano AS x, sum(contribuicoes.quantidadecontribuintes) AS y, sexo.nome AS label
	FROM contribuicoes
	INNER JOIN contribuicoespopulacao ON contribuicoespopulacao.contribuicoesID = contribuicoes.id
	INNER JOIN populacao ON contribuicoespopulacao.populacaoID = populacao.id
	INNER JOIN sexo ON populacao.sexoID = sexo.id
	GROUP BY ano, sexo.nome;

--Chart 4
SELECT sum(quantidadecontribuintes) AS value, faixaEtaria AS label
	FROM contribuicoes
	INNER JOIN contribuicoespopulacao ON contribuicoes.id = contribuicoespopulacao.contribuicoesID
	INNER JOIN populacao ON contribuicoespopulacao.populacaoID = populacao.id
	GROUP BY faixaEtaria;

--Chart 5
SELECT aposentadoria.ano AS x, sum(valor)/sum(quantidadeBeneficiosConcedidos) AS y
	FROM aposentadoria
	WHERE valor <> 0 and quantidadeBeneficiosConcedidos <> 0
	GROUP BY ano;

--Chart 6
SELECT sexo.nome AS x, avg(contribuicoes.numeroMedioMensalContribuintes) AS y
	FROM contribuicoes
	INNER JOIN contribuicoespopulacao ON contribuicoespopulacao.contribuicoesID = contribuicoes.id
	INNER JOIN populacao ON contribuicoespopulacao.populacaoID = populacao.id
	INNER JOIN sexo ON populacao.sexoID = sexo.id
	GROUP BY sexo.nome
	UNION
SELECT regiao.tipo, avg(contribuicoes.numeroMedioMensalContribuintes)
	FROM contribuicoes
	INNER JOIN contribuicoespopulacao ON contribuicoespopulacao.contribuicoesID = contribuicoes.id
	INNER JOIN populacao ON contribuicoespopulacao.populacaoID = populacao.id
	INNER JOIN regiao ON populacao.regiaoID = regiao.id
	GROUP BY regiao.tipo;