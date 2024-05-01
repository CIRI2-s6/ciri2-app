FROM devopsfaith/krakend:2.6.0


ENV JWK_URL ${JWK_URL}
ENV COMPONENT_HOST ${COMPONENT_HOST}
ENV AUDIENCE ${AUDIENCE}
ENV INFLUXDB_HOST=${INFLUXDB_HOST}
ENV INFLUXDB_PORT=${INFLUXDB_PORT}
ENV INFLUXDB_USER=${INFLUXDB_USER}
ENV INFLUXDB_USER_PASSWORD=${INFLUXDB_USER_PASSWORD}

COPY krakend.template.json /etc/krakend/krakend.template.json

RUN apk add gettext

CMD envsubst < /etc/krakend/krakend.template.json > /etc/krakend/krakend.json && krakend run -c /etc/krakend/krakend.json
