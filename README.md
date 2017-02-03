# Innovate413 Application
======


## Installation

Place package.json from fee to the root of the repo. The run the following compands

```shell
# initialize npm package
npm init
# install dependencies from package.json
npm install
# install fee core code base
sudo npm install git+ssh:git@github.com:sunergix/fee.git --save
# import gulp
cp node_modules/fee/gulpfile.js .
cp node_modules/fee/.npmignore .gitignore
# prepare code base for development extending
gulp build-dev
```

## Updating

```shell
sudo npm install git+ssh:git@github.com:sunergix/fee.git
gulp update-dev
```