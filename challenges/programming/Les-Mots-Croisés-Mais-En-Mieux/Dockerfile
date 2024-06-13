FROM python:3.6-slim

RUN apt-get clean \
    && apt-get -y update \
    && pip install pwn netcat


COPY ./src/ /app/

WORKDIR /app

EXPOSE 30002

CMD ["/usr/local/bin/python3","/app/app.py"]

