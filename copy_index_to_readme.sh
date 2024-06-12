#!/bin/bash

# Check if docs/index.md exists
if [ ! -f docs/index.md ]; then
  echo "docs/index.md not found!"
  exit 1
fi

# Create a temporary file to store the modified content
temp_file=$(mktemp)

# Replace all instances of "./" with "docs/" in the content of docs/index.md
sed 's|\./|docs/|g' docs/index.md > "$temp_file"

# Move the modified content to README.md at the root
mv "$temp_file" README.md

echo "README.md created successfully."

# Add the changes to branch
git add README.md
