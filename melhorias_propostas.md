# Proposta de melhorias

- O login poderia fazer uso de ID para salvar a sessão individualmente
- Poderia haver a opção de visualizar apenas as próprias postagens ao invés de todas as postagens
- - Esse opção poderia incluir um endpoint na API que retorna todos os posts a partir de um ID passado na URL
- Seria interessante um modo noturno
- O design atual das páginas na versão web parece vazio em resoluções maiores que 1024x768; tem uma aparência de formulário
- Quando solicitado um PATCH, a API retorna todos os dados do objetivo no corpo da resposta. Acredito que o status code correto e um body com os campos que foram alterados e o ID seria o bastante
