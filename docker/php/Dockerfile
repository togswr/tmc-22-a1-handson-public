FROM php:8.0-fpm

RUN apt-get update \
    && apt-get install -y zlib1g-dev mariadb-client vim libzip-dev \
    && apt-get install -y  \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip pdo_mysql \
    && pecl install xdebug

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y yarn

RUN useradd -ms /bin/bash jill \
    && echo "jill:re3" | chpasswd
    
USER jill

# マルチステージビルドでcomposer
COPY --from=composer:2.1 /usr/bin/composer /usr/bin/composer
