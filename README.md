# Documentação e Considerações

## Limpar cache 11ty e apagar pasta dist:
$ npx eleventy --no-watch --input ./src --output ./dist

$ rm -rf dist

### Rodar automação para compilar scss, puxar posts da API, converter para MardDown e realizar build
$ npm start


## Códigos essenciais do projeto

** src/api.js
Esse código tem como objetivo baixar dados de uma API - onde os artigos de um blog estão armazenados, salvar esses dados em arquivos JSON e, em seguida, gerar arquivos Markdown para o Eleventy processar. Além disso, ele inclui uma lógica para gerar artigos relacionados com base nas tags dos artigos. 

** src/.eleventy.js
Esse código contém todas as funcionalidades relacionadas ao 11ty e é responsável por cuidar do build

** src/package.json
Código com scripts e automações


# Painél Bubble CMS
https://flashguyscleaning.com/version-test/blogcreatetest
