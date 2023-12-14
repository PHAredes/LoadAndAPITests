# Relatório

## Abordagem

Optei por seguir o seguinte caminho:

1. Fiz testes manuais nas aplicações e na API, de forma a entender melhor o escopo do projeto e se ambos cumpriam com os requisitos básicos dispostos no Figma; usei o site <https://code-leap-network.vercel.app/> como referência para as aplicações;
2. Elaborei testes de API, servindo como testes exploratórios para compreender melhor o que a aplicação deveria fazer; fiz algumas asserções para validar a integração no "happy path" e também como a API lidava com cenários inválidos comuns;
3. Elaborei testes de carga simples, de forma a avaliar a capacidade de escala das aplicações e da API no cenário mais simples possível (carregar as páginas e inserir/retornar uma requisição respectivamente);

## Avaliação das aplicações

Dentre as aplicações fornecidas, avaliei o seguinte:

### CodeLeap-Network-Main (React) <https://drive.google.com/file/d/1e0jgAhV-vIvBLTedw304CE0Zr1RIkvh_/view?usp=drive_link>

- Atende os requisitos
- Não encontrei bugs
- Escolhi para implementar os testes unitários em React
- Funciona out of the box no W11, WSL2 com Ubuntu e no Manjaro (versões mais recentes)
- A versão faz uso de diversas dependências desatualizadas e descontinuadas
- Algumas dessas dependências apresentam vulnerabilidades a ataque DDoS
- É o único que possui uma licença

#### Desempenho

p99 < 500ms, p95 < 2000ms (falhou em ambos)

- Apresentou gargalo considerável de desempenho nos testes de carga em ambiente de desenvolvimento
- Subi a aplicação no Vercel e repeti os testes
- Não passou do warmup em nenhum dos casos

### codeleap-frontend-test-master (React) <https://drive.google.com/file/d/1HqM09N6nSgmCzVBt_9UL5ypvuFIHOQ43/view?usp=drive_link>

- Não consegui rodar localmente, há algum problema nas dependências e o README é insuficiente
- - Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './lib/tokenize' is not defined by "exports"
- Consegui testar o projeto em live pelo Vercel, no link disponível no README do projeto
- Aparenta atender os requisitos
- Docker ou um README com a versão do Node teria ajudando bastante
- A versão faz uso de diversas dependências desatualizadas e descontinuadas
- Não possui licença

Não avaliei desempenho, pois precisaria rodar o script dando alvo numa aplicação web sem autorização (ia parecer um DoS mal feito)

### CodeLeapNetwork-Main (React Native)

- Precisei baixar um APK deprecated que desse suporte a SDKs mais antigas do Expo para rodar no meu dispositivo Android;
- - Houve uma mudança na forma que o Expo funciona e ao invés de um CLI global ele configura por projeto
- - A outra alternativa demandaria modificar consideravelmente o ambiente do projeto (aquela cascata de breaking changes de projetos JS)
- A aplicação não funcionou por completo, apenas a página de login é funcional. Não consegui acessar a página feed
- Tentei novamente testar a aplicação, usei o Android Studio e o meu smartphone (Moto G9 Power) e tive o mesmo problema
- Também tentei rodar a aplicação no celular e abrir no navegador (Google Chrome) no computador; nesse caso nem abriu pq a função do webpack para a versão do Expo usada era experimental e estava quebrada
- Não possui licença

Os prints dos logs de estão disponíveis em [public](./public/)

## Bugs

### API

- Os dados do corpo da requisição não são sanitizados. É possível fazer requisições com qualquer par chave-valor no json, inclusive o delete aceita requisições com um corpo.
- É possível passar uma quantidade arbitrária de pares chave-valor com a mesma chave no body de uma requisição; a última será usada para atualizar a postagem.
- É possível alterar o valor do campo _username_ ao fazer uma requisição _patch_ no _endpoint_ <https://dev.codeleap.co.uk/careers/{{post_id}}/>; é só passar qualquer valor no campo _username_ do corpo.

### React Native

- A aplicação em React Native não funciona corretamente, ela apresenta exceção ao tentar fazer o pseudo-login e não é possível carregar o _feed_
