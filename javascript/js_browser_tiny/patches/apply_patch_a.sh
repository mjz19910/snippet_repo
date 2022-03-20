#!/bin/bash
cd `dirname $0`
patch -p0 --strip=2 --unified --backup --forward `realpath link_to_patch_a_target.js` npm_patch_a.patch 2>&-
