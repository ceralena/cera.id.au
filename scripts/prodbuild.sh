#!/bin/sh
set -ue

if [ $# -ne 1 ]; then
  echo 'Usage: ./scripts/prodbuild.sh tag'
  exit 1
fi

tag=$1
name=cera/cera.id.au:$tag

# backend
GOOS=linux gb build all

# frontend
yarn --production
npm run prodbuild

cat > run.sh <<EOF
#!/bin/sh
export STATICDIR=/static/
exec /usr/local/bin/cera.id.au >> /var/log/cera.id.au 2>&1
EOF

chmod 755 run.sh

docker build -t "$name" .

echo "Done. After review, run:\n\tdocker push $name"
