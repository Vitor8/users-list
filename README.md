# Boas vindas ao repositório da aplicação Users List!

O projeto foi feito em ReactJS, com o objetivo de criar um CRUD para uma lista de usuários. Sendo assim, é possível cadastrar, ler, atualizar e deletar os dados dos usuários. Os dados ficam salvo em Session Storage, por conta disso, ao recarregar a página, os dados não se perdem. Também utlizo o Redux para manipular o estado global da aplicação. Para garantir a qualidade do código, foram feitos testes com Jest e React Testing Library para as principais funcionalidades da aplicação.

---

# Instruções para execução do projeto

- Para executar o projeto, você pode visitar a GitHub Page do repositório, através do link: `http://Vitor8.github.io/users-list`

- Também é possível executar localmente, seguindo o seguinte passo a passo.

- Clone o repositório: `git clone git@github.com:Vitor8/users-list.git`
- Entre no diretório: `cd users-list`
- Instale as dependências: `npm install`
- Inicie a aplicação: `npm start`

---

## Estrutura

Organizei meu código no seguinte formato:

![Captura de tela de 2021-12-02 21-37-48](https://user-images.githubusercontent.com/24492328/144524945-fac451bb-4eec-4981-ab0d-1d19a34c05ab.png)

- Nas pastas `actions`, `reducers` e `store`, estão os arquivos responsáveis por manipular o estado global da aplicação usando o Redux.
- Na pasta `components` estão as funções que renderizam os components da aplicação.
- Na pasta `css` está o arquivo `Home.css`, responsável pela estilização da aplicação.
- Na pasta `pages` está o arquivo `Home.js`, responsável por renderizar a página da aplicação.
- Na pasta `test` estão as funções de teste que cobrem as principais funcionalidades do projeto.
- Os arquivos `App.js` e `index.js` são usados pelo React para renderizar toda a aplicação.

---

## Testes

As principais funcionalidades da aplicação são testadas **automaticamente**. Para cada requisito há uma série de testes que cobrem as funcionalidades daquela etapa. Os testes se encontram no arquivo `users.test.js` na pasta `test`.

Para executar os testes localmente, digite no terminal o comando `npm test`.

---

## Principais funcionalidades

Além das operações básica de CRUD para os dados dos usuários, nossa aplicação também:

- Impossibilita o cadastro de usuários com mesmo nome.
- Possibilita a ordenação de forma crescente ou decrescente por idade, bastando apenas clicar em cima de `Idade` no cabeçalho da tabela.
- Dados salvos em Session Storage. Sendo assim, ao recarregar a página, os dados não se perdem.
