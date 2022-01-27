#!/bin/bash
set -xeuo pipefail

# Stop remove docker if it's running
docker stop ssi_proto || true
docker rm ssi_proto || true

# Change port 8899 to whatever port you want to access nginx on
docker run --name ssi_proto -d -p 8899:80 ssi_proto_docker

# You can now access the protype on http://localhost:8899/
