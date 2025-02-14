#!/bin/sh

REPLACE_ENV_PREFIX=APP_CONFIG_

echo "🚀 Starting environment variable replacement..."

for env in $(env | grep $REPLACE_ENV_PREFIX)
do
  key=$(echo $env | cut -d '=' -f 1)
  value=$(echo $env | cut -d '=' -f 2-)

  find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|${key}|${value}|g" '{}' +
done

echo "🎉 All environment variables have been processed successfully!"
