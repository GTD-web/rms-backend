# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm@8.15.4

# A wildcard is used to ensure both package.json AND pnpm-lock.yaml are copied
COPY package*.json pnpm-lock.yaml ./

# Git과 기타 필요한 빌드 도구 설치
RUN apk add --no-cache git

# Set timezone
ENV TZ=Asia/Seoul
RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY apps ./apps
COPY libs ./libs
# COPY files ./files
# COPY templates ./templates
COPY nest-cli.json tsconfig.json package.json pnpm-lock.yaml ./

# Build argument for APP_NAME
ARG APP_NAME
ENV APP_NAME=${APP_NAME}

# Creates a "dist" folder with the production build
RUN pnpm run build -- ${APP_NAME}

# Start the server using the production build
CMD node dist/app/main.js