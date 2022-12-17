# simple-blog

# セットアップ

## コンテナの立ち上げ

1. 以下のコマンドをコピペしてターミナルで実行
    ```
    cp ./laravel/.env.example ./laravel/.env \
        && docker-compose build \
        && docker-compose run --rm blog npm install \
        && docker-compose run --rm admin npm install \
        && docker-compose run --rm laravel composer install \
        && docker-compose run --rm laravel php artisan key:generate \
        && docker-compose run --rm laravel php artisan migrate:fresh --seed \
        && docker-compose up -d
    ```
2. `localhost:8000` 、 `localhost:3000` および `localhost:3001` にブラウザでアクセスできることを確認

### 個別でのコマンドは実行は以下のとおり

1. `docker-compose build`
2. `docker-compose run --rm blog npm install`
3. `docker-compose run --rm admin npm install`
4. `docker-compose run --rm laravel composer install`
5. `docker-compose run --rm laravel php artisan key:generate`
6. `docker-compose run --rm laravel php artisan migrate:fresh --seed`
7. `docker-compose up -d`
8. `localhost:8000` 、 `localhost:3000` および `localhost:3001` にブラウザでアクセスできることを確認

## コンテナのシャットダウン

1. `docker-compose down`

## すべてのコンテナを削除

- `docker-compose down --rmi all --volumes --remove-orphans`

参考: [《滅びの呪文》Docker Compose で作ったコンテナ、イメージ、ボリューム、ネットワークを一括完全消去する便利コマンド - Qiita](https://qiita.com/suin/items/19d65e191b96a0079417)
