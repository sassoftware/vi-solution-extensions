#!/bin/bash

# This script serves as a pre-commit task which auto-generates 
# a table of contents based on the docs/pages directory.

function generate_toc() {
  TABLE="1. [Home](../../README.md)"

  # Build the rest of the table of contents based on ./docs/pages directory
  for file in $(find docs/pages -name '*.md' | sort -Vt - -k1,1); do
    filename=$(basename "$file")
    page_index=$(echo $filename | cut -d "-" -f1)

    if grep -q "<!-- toc_end -->" "$file"; then
      title=$(cat $file | sed -e '1,/toc_end/d' | sed '/^[[:space:]]*$/d' | head -n 1 | sed -e "s/^#\ //")
    else
      title=$(head -n 1 $file | sed -e "s/^#\ //")
    fi

    TABLE+="\n$(( $page_index + 1 )). [$title](./$filename)"
  done
}

function update_document() {
  file=$1
  temp_file=$(mktemp)

  if grep -q "<!-- toc_end -->" "$file"; then
    echo -e "$TABLE_OF_CONTENTS\n$(cat $file | sed -e '1,/toc_end/d')" > "$temp_file"
  else
    echo -e "$TABLE_OF_CONTENTS\n$(cat $file)" > "$temp_file"
  fi

  if [ $file = "README.md" ]; then
    echo -e "$(cat $temp_file | sed 's|\.\./||g' | sed 's|\./|\./docs/pages/|g')" > $file
  else
    mv "$temp_file" "$file"
  fi

  echo "- Updated ./$file"
}

if [ ! -f ./docs/template.md ]; then
  echo "docs/template.md not found!"
  exit 1
fi

echo -e "\nGenerating table of contents for docs directory:" && generate_toc

TABLE_OF_CONTENTS=$(cat docs/template.md | sed -e "s%{{ toc }}%$TABLE%")

# Update the table of contents for each page in docs/pages
for file in $(find docs/pages -name '*.md' | sort -Vt - -k1,1); do
  update_document $file
done

# Update the table of contents in README.md
update_document README.md

# Add README.md to git
git add README.md

# Add all modified markdown files in docs to git
git add docs/*.md

echo -e "\nAll changes added to git."
