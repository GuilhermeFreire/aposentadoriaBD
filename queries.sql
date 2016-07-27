-- Chart 1
SELECT ano, sum(valor)
	FROM aposentadoria
	WHERE valor > 0
	GROUP BY ano
	ORDER BY ano;

--Chart 2
