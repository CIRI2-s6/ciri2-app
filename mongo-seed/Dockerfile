FROM mongo

COPY pc-db.components.json /pc-db.components.json

CMD mongoimport --uri mongodb://mongo:27017/pc-db --collection components --drop --file /pc-db.components.json --jsonArray



