FROM mongo

COPY ${SEED_FILE} /${SEED_FILE}
CMD mongoimport --host ${MONGO_HOST} --db ${MONGO_DB_NAME} --collection ${MONGO_COLLECTION_NAME} --type csv --file /${SEED_FILE} --headerline --drop