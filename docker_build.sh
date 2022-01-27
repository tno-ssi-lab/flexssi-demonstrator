#!/bin/bash
set -xeuo pipefail

# Build js + css
npm run build

docker build -t ssi_proto_docker .
