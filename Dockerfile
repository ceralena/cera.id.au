FROM phusion/baseimage:0.9.19

CMD ["/sbin/my_init"]

EXPOSE 3000

# install nodejs
RUN curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
RUN echo 'deb https://deb.nodesource.com/node_7.x xenial main' > /etc/apt/sources.list.d/nodesource.list
RUN apt-get update
RUN apt-get install -y nodejs

# add the code
ADD dist /var/www/cera.id.au/dist
ADD node_modules /var/www/cera.id.au/dist/node_modules
ADD static /var/www/cera.id.au/static

# add the run file
ADD run.sh /etc/service/cera.id.au/run
