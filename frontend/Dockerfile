FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy all application files to the Nginx html directory
COPY . .

# Cloud Run uses the PORT environment variable (default 8080)
ENV PORT=8080

# Create an Nginx configuration template
# - Listens on the dynamic $PORT provided by Cloud Run
# - Serves index.html for all unmatched routes (SPA fallback routing)
RUN printf 'server {\n\
    listen ${PORT};\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    \n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf.template

# Add TS and TSX to the global mime.types file so the browser receives the correct content type
RUN sed -i 's/application\/javascript js;/application\/javascript js ts tsx;/g' /etc/nginx/mime.types

# Substitute the PORT variable at runtime and start Nginx
CMD envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
