#!/bin/bash

cd /home/ec2-user/<APP_FOLDER>/
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
. ~/.nvm/nvm.sh
nvm install v7.1.0
nvm use
npm install