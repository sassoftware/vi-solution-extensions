# 10.7 QR Code source files

The 3 files in this directory are the source files for the QR Code component on a 10.7 deployment. The contents of these files would have been inserted into the `fdhmetadata.dh_control` PostgreSQL table for the 10.7 deployment.

* [qr_table_data.txt](qr_table_data.txt) - contains all fields which would be seen on the  `fdhmetadata.dh_control` table for the row that represents this QR component.
* [QRCode-component.html](QRCode-component.html) - contains the code present in the `template_html_doc` column of the `fdhmetadata.dh_control` table.
* [QRCode-component.js](QRCode-component.js) - contains the code present in the `directive_txt` column of the `fdhmetadata.dh_control` table.  
