#!/bin/bash
# этот ф-л запустит сервис jsm
# echo "$PWD"
# echo "$NODE_ENV"

cd client
# tree -L 2 -I node_modules
# ls -al
# pnpm -v

rm -rf node_modules

store=node_modules/.pnpm-store

echo "устанавливаю зависимости"
pnpm i

echo "собираю клиента"
pnpm build
