#!/bin/bash

# Setup script for Expense Tracker Desktop App
# This script installs npm dependencies for the backend, frontend, and desktop directories.
# Run this script with internet access enabled.

set -e

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

declare -a modules=("backend" "frontend" "desktop")

for dir in "${modules[@]}"; do
  echo "Installing dependencies in $dir..."
  (cd "$BASE_DIR/$dir" && npm install)
  echo "Finished installing $dir"
done

echo "All dependencies installed."
