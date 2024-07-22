#!/bin/bash

# Define the hosts to be added
declare -a hosts=(
  "127.0.0.1 api.polybank.localhost"
  "127.0.0.1 app.polybank.localhost"
)

# Function to check if a host is already in /etc/hosts
host_exists() {
  local host_entry=$1
  grep -q "$host_entry" /etc/hosts
}

# Function to add a host to /etc/hosts
add_host() {
  local host_entry=$1
  if host_exists "$host_entry"; then
    echo "$host_entry already exists in /etc/hosts"
  else
    echo "Adding $host_entry to /etc/hosts"
    echo "$host_entry" | sudo tee -a /etc/hosts > /dev/null
  fi
}

# Add each host entry
for host_entry in "${hosts[@]}"; do
  add_host "$host_entry"
done

echo "Hosts setup complete."