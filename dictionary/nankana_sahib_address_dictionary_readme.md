# Nankana Sahib Address Dictionary

This package contains a JSON allowlist/normalization dictionary for District Nankana Sahib.

## Contents
- nankana_sahib_address_dictionary.json
- nankana_sahib_address_dictionary.csv

## Practical use
1. Normalize user input.
2. Compare against `flat_keywords` or the per-record `normalized_aliases`.
3. Reject only after normalization and alias matching fail.

## Important note
This is a strong starting dictionary built from publicly accessible district/local-government sources, but it is not a substitute for a complete GIS/postal database.
