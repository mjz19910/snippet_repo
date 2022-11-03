#!/bin/bash
cd `dirname $0`
patch -p0 --strip=2 --unified --backup --forward `cat patch_target.url` npm_patch_a.patch 2>&-
