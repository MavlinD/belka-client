FROM node:18

ARG USERNAME=node

WORKDIR /home/$USERNAME

RUN apt update &&  \
    apt -y install tree && \
    npm install -g npm@latest

RUN curl https://getmic.ro | bash
RUN mv micro /usr/bin

RUN npm i pnpm -g

USER $USERNAME
