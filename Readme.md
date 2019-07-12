# itm-api

API for intimate.io

# Setup

## Brew
You will need the latest version of brew to make the API run locally. To install, enter the following on the terminal

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Once installed, you will need to have MongoDB, NodeJS, and Yarn

# MongoDB
When running the API locally, you will need to install MongoDB 4.0 or greater. On MacOS this can be installed locally by running

```sh
$ brew install mongodb
```
# NodeJS
NodeJS 10.10 is required to run the API locally, On MacOS this can be installed via the package provided in the following link https://nodejs.org/en/download/

# Yarn
Finally, once you have NodeJS installed, you must install yarn. This can be done by running the command on your terminal
```sh
brew install yarn
```
For more info, you can follow this page https://yarnpkg.com/lang/en/docs/install/#mac-stable

# Installation

To have the api running, run the following commands

```sh
cd <directory of repo>
yarn
cp .env.example .env
yarn start
```

Make sure MONGODB_URI is set to mongodb://localhost/intimate on .env file