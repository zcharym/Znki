#!/bin/bash

my_env_file=./src/config/config.dev.env
env_build_file=./prisma/.env

if [[ -f "$env_build_file" && -s "$env_build_file" ]]; then
    echo "env file is already existed and not empty"
else
    touch ./prisma/.env

    cat $my_env_file | grep DATABASE_URL >$env_build_file

    npm run poststart

    npx prisma db push --preview-feature
fi
