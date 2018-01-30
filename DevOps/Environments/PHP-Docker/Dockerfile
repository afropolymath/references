FROM nimmis/apache-php7

MAINTAINER Chidiebere I. Nnadi <chidiebere.nnadi@gmail.com>

COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

RUN apt-get update
RUN apt-get install php7.0-xml -y
RUN apt-get install php-mbstring -y

EXPOSE 80
EXPOSE 443

RUN a2enmod rewrite

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]

RUN service apache2 restart
