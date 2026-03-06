#! /bin/bash

VERSION='1.4.7'
curl -fsSL "https://raw.githubusercontent.com/flatpak/flatpak-builder/refs/tags/${VERSION}/data/flatpak-manifest.schema.json" | json2ts --unreachableDefinitions --style.printWidth 80 --style.singleQuote --no-style.semi --bannerComment="/* Generated from flatpak-builder ${VERSION} manifest schema with json-schema-to-typescript */" -o src/types/flatpak-builder-manifest.d.ts
