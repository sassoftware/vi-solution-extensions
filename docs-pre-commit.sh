#!/bin/bash

# Clear out the existing contents of the docs directory
rm -rf docs/*
mkdir -p docs

# Check if contents.md exists in docs-original/contents
if [ ! -f docs-original/contents/contents.md ]; then
  echo "docs-original/contents/contents.md not found!"
  exit 1
fi

# Loop through all markdown files in docs-original/pages
for file in $(find docs-original/pages -name '*.md'); do
  # Extract filename without path
  filename=$(basename "$file")

  # Append contents of contents.md followed by a newline to the start of each markdown file
  temp_file=$(mktemp)
  (cat docs-original/contents/contents.md; echo ""; cat "$file") > "$temp_file"

  # Move the modified content to the corresponding file in the docs directory
  mv "$temp_file" "docs/$filename"

  echo "Modified docs/$filename successfully."
done

# Replace all instances of "./" with "docs/" in the content of docs/index.md
sed 's|\./|docs/|g' docs/index.md > README.md

echo "README.md created successfully."

# Add README.md to git
git add README.md

# Add all modified markdown files in docs to git
git add docs/*.md

echo "All files added to git."
