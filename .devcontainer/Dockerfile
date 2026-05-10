# See https://containers.dev/ for more information about Dev Containers
FROM grafana/k6:latest as k6

FROM mcr.microsoft.com/devcontainers/javascript-node:0-20

ENV DEBIAN_FRONTEND=noninteractive

# Copy official k6 binary from Grafana's image
COPY --from=k6 /usr/bin/k6 /usr/bin/k6

# Set a working directory for the container
WORKDIR /workspace
