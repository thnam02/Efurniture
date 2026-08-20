#!/bin/sh
set -e

echo "Waiting for database..."
retries=30
until npx prisma migrate deploy; do
  retries=$((retries - 1))
  if [ "$retries" -le 0 ]; then
    echo "Database migrate failed"
    exit 1
  fi
  echo "Retrying migrate in 2s..."
  sleep 2
done

if [ "$SEED_ON_START" = "true" ]; then
  echo "Seeding database..."
  npx tsx prisma/seed.ts || true
fi

exec node dist/index.js
