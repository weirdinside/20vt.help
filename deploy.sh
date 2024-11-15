#!/bin/bash
# deploy.sh

# VPS details
DEPLOY_USER="root"
DEPLOY_HOST="46.202.92.67"
DEPLOY_PATH="/var/www/nextjs/20vt_help"
PM2_APP_NAME="20vt"

echo "Building application..."
npm run build

echo "Copying files to server..."
rsync -avzP --delete \
    --exclude='.git/' \
    --exclude='.github/' \
    --exclude='.gitignore' \
    --exclude='node_modules/' \
    --exclude='.next/cache/' \
    --exclude='coverage/' \
    --exclude='*.log' \
    --exclude='.DS_Store' \
    --exclude='README.md' \
    --exclude='deploy.sh' \
    --exclude='tests/' \
    --exclude='__tests__/' \
    --exclude='test/' \
    --exclude='jest.config.js' \
    --exclude='.eslintrc*' \
    --exclude='.prettier*' \
    --exclude='.husky/' \
    --exclude='.vscode/' \
    --exclude='*.lock' \
    --exclude='*.md' \
    --exclude='tsconfig.json' \
    --exclude='jsconfig.json' \
    ./ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/

echo "Installing dependencies and restarting application..."
ssh $DEPLOY_USER@$DEPLOY_HOST "cd $DEPLOY_PATH && \
    npm install --production && \
    pm2 restart $PM2_APP_NAME || \
    pm2 start npm --name $PM2_APP_NAME -- start"

echo "Deployment complete!"