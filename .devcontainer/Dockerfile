# syntax=docker/dockerfile:1.4
# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.234.0/containers/typescript-node/.devcontainer/base.Dockerfile
ARG VARIANT="16-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# Add a custom prompt to the image because the default one is a bit too noisy.
WORKDIR /home/node
COPY .bash_aliases .bash_aliases
COPY .bash_local .bash_local
RUN <<EOF
echo "source ~/.bash_aliases" >> .bashrc
echo "source ~/.bash_local" >> .bashrc
EOF
