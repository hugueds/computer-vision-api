FROM python:3.6-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/

ENV http_proxy=http://opengate.br.scania.com:3128
ENV https_proxy=http://opengate.br.scania.com:3128

RUN apk add dev86 linux-headers libsasl python3-dev libc-dev libldap libressl-dev net-snmp-dev openldap-dev gcc zeromq-dev libzmq musl libffi-dev openssl-dev

ENV http_proxy=
ENV https_proxy=
ENV no_proxy=
 

RUN pip install -i http://repo.br.scania.com/repository/pypi-all/simple --trusted-host repo.br.scania.com -r requirements.txt
 
COPY . /usr/src/app

EXPOSE 5000

CMD ["/usr/local/bin/python3.6","app.py"]
