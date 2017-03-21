FROM phusion/baseimage:0.9.19

CMD ["/sbin/my_init"]

RUN mkdir /var/www/cera.id.au

ADD dist /var/www/cera.id.au/dist
ADD static /var/www/cera.id.au/static

ADD run.sh /etc/service/cera.id.au/run

EXPOSE 3000
