FROM nginx:alpine
COPY  dist/apps/frontend/browser /usr/share/nginx/html
COPY ./apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
EXPOSE 8443
