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
3 - Ao finalizar a instalação das dependências execute o comando yarn start para startar a aplicação. <br/>
4 - Para fazer login na aplicação utlize o usuário admin e senha admin.

## Testes unitários com phpUnit

No projeto php, foram criadas classes de teste unitários para algumas classes do modelo de domínio com o intuito de exemplificar/demonstrar a utilização de teste unitários. Neste contexto optou-se por utilizar o framework phpUnit, por ser uma ferramenta profissional que aborda o know how de testes unitários e funcionais. <br/>

Os arquivos de teste unitários estão no caminho "Back/tests". <br/>

1 - Para executar os testes unitários é necessário estar dentro do diretório raiz do projeto php, neste caso é a pasta 'Back' no terminal <br/>
2 - Digite o comando vendor\bin\phpunit nomeDoArquivo.php e pressione enter<br/>
2.1 - Lembrese que nomeDoArquivo.php deve ser alterado para o nome real do arquivo de teste. <br/>
3 - Confira o resultado da execução dos testes no terminal. <br/>
4 - Caso queira executar todos os arquivos de uma vez, basta informar o nome da pasta onde os testes estão localizados: vendor\bin\phpunit tests <br/>

## Uma dica importante:

Lembre-se de restaurar o backup do banco de dados antes de iniciar!
