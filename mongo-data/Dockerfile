FROM mongo:3.4-jessie

# Copy transfers data file
COPY transfers.json /etc/transfers.json

# Import transfers data file
CMD mongoimport --host db --db test --collection transfers --type json --file /etc/transfers.json --jsonArray