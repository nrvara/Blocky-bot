#!/bin/sh
chmod +x node_modules/.bin/webpack
NODE_OPTIONS=--openssl-legacy-provider npx webpack --colors --bail
