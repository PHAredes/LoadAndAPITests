# Tests Doc

Nesse diretório estão contidos os testes de API, de carga e de integração da API e do website (frontend)

## Pre-requisitos

Para rodar os testes, é necessário ter instalado na máquina:

- [Node.js](https://nodejs.org) (versão 18+)
- npm (já vem instalado com Node.js)
- [Bruno API Client](https://www.usebruno.com/downloads) (alt: [Bruno CLI](https://docs.usebruno.com/cli/overview.html))
- [Artillery](https://www.artillery.io/docs/get-started/get-artillery)

``` bash
npm install -g @usebruno/cli 
```

``` bash
npm install -g artillery@latest
```

## Configuração

Os scripts para a API local estão configurados para o servidor rodando na porta 3000. É possível modificar isso rodando o seguinte script:

```bash
 node swap_local_host_port.js {n° porta}
```

Além disso, os testes de carga usam o arquivo [users.csv](/artillery_load_tests/users.csv). Esse arquivo pode ser gerado rodando o seguinte script:

```bash
node csv_generator.js
```

## Bruno API

No cliente do Bruno, é possível visualizar os testes para a API, bem como um esboço de documentação para cada endpoint. Os scripts estão separado em [codeleap_api](/codeleap_api/) (testa a API disponibilizada pela Codeleap em <https://dev.codeleap.co.uk/careers>) e [local_api](/local_api/) (os mesmos scripts)

### utils

Fornece scripts úteis para outros testes. Essencialmente, fornece um script para limpar a database local e outro para limpar a database remota

#### Local

```bash
bru run ""./utils/Clean Local Database.bru"
```

#### Remoto

```bash
bru run ""./utils/Clean Database.bru"
```

### codeleap_api

#### happy_path_no_mocks

Os scripts aqui chamam os endpoints em sequência de forma a não quebrar. Executá-los fora de ordem vai fazer os testes falharem. É apenas um teste de integração do "caminho feliz"

Para executar, clique com o botão direito na pasta dentro do Bruno API Client e escolha run. Alternativamente:

``` bash
bru run ./codeleap_api/happy_path_no_mocks
```

#### invalid_data

Os scripts aqui chamam os endpoints com valores inválidos ou vazios.

Para executar, clique com o botão direito na pasta dentro do Bruno API Client e escolha run. Alternativamente:

``` bash
bru run ./codeleap_api/invalid_data
```

### local_api

Os scripts aqui fazem o mesmo que os scripts que testam a API remota, só que numa API rodando num servidor local

#### happy_path_with_mocks

Os scripts aqui chamam os endpoints em sequência de forma a não quebrar. Executá-los fora de ordem vai fazer os testes falharem. É apenas um teste de integração do "caminho feliz" usando dados mockados.

Para executar, clique com o botão direito na pasta dentro do Bruno API Client e escolha run. Alternativamente:

``` bash
bru run ./local_api/happy_path_no_mocks
```

#### invalid_data_local

Os scripts aqui chamam os endpoints com valores inválidos ou vazios.

Para executar, clique com o botão direito na pasta dentro do Bruno API Client e escolha run. Alternativamente:

``` bash
bru run ./local/invalid_data
```

## Artillery

### Setup

Teste de carga simples. Na API faz uma série de posts (o payload vem de um csv gerado com dados mockados pelo faker) e um get após cada post. Nas aplicação chama as páginas index e feed.

Os valores foram arbitrados com base no "acho que tá bom assim". Bom, eu não tenho uma métrica a seguir então usei essa. Os testes não fazem sentido num ambiente real e são apenas para demonstrar que eu consigo fazer um teste de carga e analisar os dados

### Local Load Test

```bash
artillery run artillery_local_api.yml
```

Rodar o seguinte script após esse teste apaga os posts:

```bash
bru run ""./utils/Clean Local Database.bru"
```

### Remote Load Test (cuidado)

> [!CAUTION]
> Esse script pode gerar até 372000 requisições na API, e vai inserir muitos dados na base de dados da CodeLeap. Certifique-se que você tem permissão para isso!

```bash
artillery run artillery_remote_api.yml
```

Certifique-se de rodar o seguinte comando após esse teste para apagar os posts:

```bash
bru run "./utils/Clean Database.bru"
```

### Application Load Test

```bash
artillery run artillery_front_webpages.yml
```

## Outros

### CSV Generator

Fornece um arquivo .csv com o payload para os testes de carga. Já está tudo configurado, é só rodar

```bash
node csv_generator.js
```

### Bugs

Sumário de bugs e comportamentos fora do padrão encontrados durante os testes. Disponível [aqui](/relatorio.md#bugs)
