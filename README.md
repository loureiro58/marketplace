# marketplace
Repositório contendo front e back do desafio SoftExpert

O back-end foi desenvolvido usando php versão 8.1.10 e o front-end foi desenvolvido utilizando React.js com o Node.js na versão 18.16.0.

Após realizar o clone do repositório, realize os seguintes passos para subir os projetos:

## Para subir o projeto PHP

1 - Abra o terminal ou prompt de comando. <br/>
2 - Acesse a pasta Back e rode o comando composer init. Pressione enter para as perguntas que o console irá exibir. <br/>
3 - Acesse o arquivo composer.json e edite o conteúdo de "psr-4", alterando para:  <br/>
        "psr-4": {
            "app\\": "app"
        }
<br/>
4 - Gere o arquivo autoload executando no terminal: composer dump-autoload <br/>
5 - Acesse a pasta public e rode o comando php -S localhost:8080 para startar o servidor emutido. <br/>

Observação: caso tenha dificuldades de instalar o php ou habilitar o servidor embutido no recomendo assistir o vídeo https://www.youtube.com/watch?v=HzIXZVctwI8

## Para subir o projeto React.js

1 - Abra o terminal ou prompt de comando. <br/>
2 - Acesse a pasta Front\front e rode o comando npm install para instalar as dependências do projeto. <br/>
3 - Ao finalizar a instalação das dependências executo o comando yarn start para startar a aplicação. <br/>
4 - Para fazer login na aplicação utlize o usuário admin e senha admin.
