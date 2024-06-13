# FROM python:3.6-slim

FROM ubuntu:latest

RUN apt-get clean \
    && apt-get -y update \
    && apt-get install nano python3 -y


COPY ./src/ /app/

WORKDIR /app

EXPOSE 30002

CMD ["python3","/app/app.py"]

