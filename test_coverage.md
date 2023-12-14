# Cobertura de testes

Os testes manuais cobrem:

- Usabilidade da aplicação em ambiente local e em ambiente virtual simulado
- Usabilidade da API
- Atendimento de requisitos como disposto no arquivo no Figma

Os testes de API cobrem:

- O caminho feliz do CRUD:

- - Um post com dados simulados
- - Um get
- - Um update com dados simulados
- - Um delete dando alvo nos dados inseridos pelo post

- Dados inválidos, sendo:

- - Body vazio no post
- - Body vazio no update
- - Delete sem caminho específicado
- - Body com campo para alterar username
- - Uma request com xml no body ao invés de Json

Os testes de carga cobrem:

- Uma sequência de post -> get com dados simulados na API
- Uma sequência de get na index page -> get na feed page com dados simulados na aplicação

As métricas usadas foram:

- p95 < 500ms
- p99 < 2000ms

| Fase           | Duração (s) | Taxa de Chegada Inicial | Rampa até Taxa de Chegada | Total de Requisições |
|----------------|-------------|-------------------------|---------------------------|----------------------|
| Warm-up        | 60          | 1 por segundo           | 5 por segundo             | 54,000               |
| Ramp-up        | 60          | 5 por segundo           | 10 por segundo            | 132,000              |
| Spike          | 30          | 10 por segundo          | 30 por segundo            | 186,000              |
| Total Geral    | -           | -                       | -                         | 372,000              |
