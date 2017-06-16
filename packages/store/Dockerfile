FROM postgres:9.6.3-alpine

COPY . /docker-entrypoint-initdb.d/

EXPOSE 5432

CMD ["postgres"]
