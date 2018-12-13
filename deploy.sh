#!/usr/bin/env bash
set -e

vuepress build

cd .vuepress/dist

git clone https://github.com/limdongjin/limdongjin.github.io

cp -rf limdongjin.github.io/.git ./.git

rm -rf limdongjin.github.io

git config --global http.postBuffer 524288000

git add .

git commit -m "$1"

git push origin master

cd -
