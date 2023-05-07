FROM ubuntu:latest
LABEL authors="barakamwau"

# Set environment variables for non-interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# Update the package list and install required dependencies
RUN apt-get update && \
    apt-get install -y wget gnupg apt-transport-https ca-certificates

# Add the RabbitMQ repository signing key and repository
RUN wget -O- https://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc | apt-key add - && \
    echo "deb https://packages.erlang-solutions.com/ubuntu focal contrib" > /etc/apt/sources.list.d/erlang.list

# Install RabbitMQ and its dependencies
RUN apt-get update && \
    apt-get install -y esl-erlang rabbitmq-server

# Expose the RabbitMQ ports
EXPOSE 5672 15672

# Start the RabbitMQ server when the container starts
CMD ["rabbitmq-server"]