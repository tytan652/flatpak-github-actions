#! /bin/bash

actions=(
  'add-remotes'
  'install-deps'
  'download-sources'
  'build-and-finish'
  'export-build'
  'bundle'
  'build-full'
)

tsc --removeComments

for action in "${actions[@]}"; do
  ncc build "lib/${action}.js" -o "dist/${action}"
done
