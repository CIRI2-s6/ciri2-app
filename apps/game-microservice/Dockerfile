# Use a smaller base image for the builder stage
FROM golang:1.22.1 AS builder

# Set destination for COPY
WORKDIR /app

ENV REDISURI=${REDISURI}

# Download Go modules
COPY apps/game-microservice/go.mod apps/game-microservice/go.sum ./
RUN go mod download

# Install ca-certificates
RUN apt-get update && apt-get install -y ca-certificates

COPY  apps/game-microservice .

# Build go application
RUN CGO_ENABLED=0 GOOS=linux go build -o ciri2-game-microservice ./cmd

# Use a minimal base image for the final image
FROM scratch

# Copy the built binary from the builder stage
COPY --from=builder /app/ciri2-game-microservice /ciri2-game-microservice

# Copy the SSL certificates from the builder stage
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Expose the port
EXPOSE 4050

# Run the binary
CMD ["/ciri2-game-microservice"]
