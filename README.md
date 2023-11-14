# marketplace
Repositório contendo front e back do desafio SoftExpert

O back-end foi desenvolvido usando php versão 8.1.10 e o front-end foi desenvolvido utilizando React.js com o Node.js naversão 18.16.0.

Após realizar o clone do repositório, realize os seguintes passos para subir os projetos:

## Para subir o projeto PHP

1 - Abra o terminal ou prompt de comando.
2 - Acesse a pasta Back e rode o comando composer init. Pressione enter para as perguntas que o console irá exibir.
3 - Acesse o arquivo composer.json e edite o conteúdo de "psr-4", alterando para: 
        "psr-4": {
            "app\\": "app"
        }

4 - Gere o arquivo autoload executando no terminal: composer dump-autoload
5 - Acesse a pasta public e rode o comando php -S localhost:8080 para startar o servidor emutido.

## Para subir o projeto React.js

1 - Abra o terminal ou prompt de comando.
2 - Acesse a pasta Front\front e rode o comando npm install para instalar as dependências do projeto.
3 - Ao finalizar a instalação das dependências executo o comando yarn start para startar a aplicação.
