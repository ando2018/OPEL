# Take node v8.11.2:
FROM node:8.11.2

# Create app's directory in container:
RUN mkdir -p /var/www/db-seed

# Set /var/www/db-seed as default working directory:
WORKDIR /var/www/db-seed

# Copy files not listed in /dockerignore:
COPY . /var/www/db-seed

# Run npm install:
RUN npm install

# Expose port 3000
EXPOSE 3000