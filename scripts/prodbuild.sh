#!/bin/sh
set -ue

if [ $# -ne 1 ]; then
  echo 'Usage: ./scripts/prodbuild.sh tag'
  exit 1
fi

tag=$1
name=cera/cera.id.au:$tag

# backend
yarn
npm run prodbuild

# delete node_modules and install prod dependencies only
rm -rf node_modules
yarn --production --ignore-optional

cat > run.sh <<EOF
#!/bin/sh
cd /var/www/cera.id.au
export STATIC_DIR=\`pwd\`/static
export NODE_ENV=production
node dist/server/server.js 2>&1 | logger
EOF

chmod 755 run.sh

sudo docker build -t "$name" .
git tag "$tag"

echo "Done. After review, run:\n\tdocker push $name && git push origin $tag"
