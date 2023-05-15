FROM node:16-alpine as development

# Create non-root user
ARG USERNAME=banpal
ARG USER_UID=1001
ARG USER_GID=$USER_UID
RUN addgroup -S $USERNAME \
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && adduser -u $USER_UID -G $USERNAME -S $USERNAME
USER $USERNAME
