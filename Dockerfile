# Updated: 2025-12-27 clear cache
FROM mcr.microsoft.com/playwright:v1.55.0-noble

RUN apt-get update && apt-get install -y bash make

WORKDIR /project

COPY . .

RUN npm ci
