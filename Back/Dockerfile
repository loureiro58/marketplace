FROM php:8.2

RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && composer self-update
RUN docker-php-ext-install pdo pdo_postgres

WORKDIR /back
COPY /Back /back

CMD composer install && php -S localhost:8080

EXPOSE 8080