# Dockerfile for Lightweight Ubuntu Desktop
FROM ubuntu:22.04

# Avoid prompts during build
ENV DEBIAN_FRONTEND=noninteractive

# Install lightweight desktop environment (XFCE) and VNC server
RUN apt-get update && apt-get install -y \
    xfce4 \
    xfce4-goodies \
    tigervnc-standalone-server \
    tigervnc-common \
    dbus-x11 \
    sudo \
    nano \
    wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create a user
RUN useradd -m -s /bin/bash ubuntu && \
    echo "ubuntu:ubuntu" | chpasswd && \
    usermod -aG sudo ubuntu

# Set up VNC
USER ubuntu
WORKDIR /home/ubuntu

# Create VNC password
RUN mkdir -p ~/.vnc && \
    echo "ubuntu" | vncpasswd -f > ~/.vnc/passwd && \
    chmod 600 ~/.vnc/passwd

# Configure VNC xstartup
RUN echo '#!/bin/sh\n\
unset SESSION_MANAGER\n\
unset DBUS_SESSION_BUS_ADDRESS\n\
exec startxfce4' > ~/.vnc/xstartup && \
    chmod +x ~/.vnc/xstartup

# Expose VNC port
EXPOSE 5901

# Start VNC server
CMD ["vncserver", ":1", "-geometry", "1920x1080", "-depth", "24", "-localhost", "no"]