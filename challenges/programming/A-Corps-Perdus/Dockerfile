FROM python:3.6-slim

RUN apt-get clean \
    && apt-get -y update

RUN apt-get -y install uwsgi-plugin-python3 \
    && apt-get -y install python3-dev \
    && apt-get -y install build-essential \
    && apt-get -y install uwsgi-core 

COPY src/app/ /app
COPY src/uwsgi.ini /app/uwsgi.ini
COPY start /start

RUN pip3 install -r /app/requirements.txt --src /usr/local/src

WORKDIR /app
RUN chmod +x /start
# CMD ["flask","run","-p","80", "--host", "0.0.0.0"]
CMD ["/start"]

