FROM ubuntu:latest
LABEL authors="barakamwau"

# Set environment variables for non-interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# Update the package list and install required dependencies
RUN apt-get update && \
    apt-get install curl gnupg apt-transport-https -y

# Add the RabbitMQ repository signing key and repository
RUN curl -1sLf https://ppa1.novemberain.com/gpg.E495BB49CC4BBE5B.key | gpg --dearmor | tee /usr/share/keyrings/rabbitmq.E495BB49CC4BBE5B.gpg > /dev/null

RUN tee /etc/apt/sources.list.d/rabbitmq.list
# Install RabbitMQ and its dependencies
RUN apt-get update -y && \
    apt-get install -y erlang-base \
    erlang-asn1 erlang-crypto erlang-eldap erlang-ftp erlang-inets \
    erlang-mnesia erlang-os-mon erlang-parsetools erlang-public-key \
    erlang-runtime-tools erlang-snmp erlang-ssl \
    erlang-syntax-tools erlang-tftp erlang-tools erlang-xmerl

RUN apt-get install rabbitmq-server -y --fix-missing

# Expose the RabbitMQ ports
EXPOSE 5672 15672

# Start the RabbitMQ server when the container starts
CMD ["rabbitmq-server"]