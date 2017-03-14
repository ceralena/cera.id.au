FROM phusion/baseimage:0.9.19

CMD ["/sbin/my_init"]

ADD bin/cera.id.au /usr/local/bin/cera.id.au
ADD static /static
RUN mkdir /etc/service/cera.id.au
ADD run.sh /etc/service/cera.id.au/run

EXPOSE 8080
