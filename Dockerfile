FROM nginx

MAINTAINER Devkingos

# RUN apt-get update && \
#     apt-get install -y software-properties-common && \
#     add-apt-repository ppa:certbot/certbot && \
#     apt-get update && \ 
#     apt-get install -y python-certbot-nginx
#    apt-get install -y openssl && \
#     openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 && \
#     openssl rsa -passin pass:x -in server.pass.key -out server.key && \
#     rm server.pass.key && \
#     openssl req -new -key server.key -out server.csr \
#         -subj "/C=UK/ST=Warwickshire/L=Leamington/O=OrgName/OU=IT Department/CN=ezeizatour.com" && \
#     openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

VOLUME ./client/dist/tudoclegal:/usr/share/nginx/html:ro

EXPOSE 80