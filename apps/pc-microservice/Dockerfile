# Use a smaller base image for the builder stage
FROM golang:1.22.1 AS builder

# Set destination for COPY
WORKDIR /app

ENV MONGOURI = ${MONGOURI}

# Download Go modules
COPY apps/pc-microservice/go.mod apps/pc-microservice/go.sum ./
RUN go mod download

COPY  apps/pc-microservice .

# Build go application
RUN CGO_ENABLED=0 GOOS=linux go build -o ciri2-pc-microservice ./cmd

# Use a minimal base image for the final image
FROM scratch
# Copy the built binary from the builder stage
COPY --from=builder /app/ciri2-pc-microservice /ciri2-pc-microservice

# Expose the port
EXPOSE 4050

# Run the binary
CMD ["/ciri2-pc-microservice"]