# Bugs

- Os dados do corpo da requisição não são sanitizados. É possível fazer requisições com qualquer par chave-valor no json, inclusive o delete aceita requisições com um corpo.
- É possível passar uma quantidade arbitrária de pares chave-valor com a mesma chave no body de uma requisição; a última será usada para atualizar a postagem.
- É possível alterar o valor do campo _username_ ao fazer uma requisição _patch_ no _endpoint_ <https://dev.codeleap.co.uk/careers/{{post_id}}/>; é só passar qualquer valor no campo _username_ do corpo.
