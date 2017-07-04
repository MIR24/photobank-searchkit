#!bin/bash
DESTINATION=/var/www/editors.mir24.tv/public/ftb/
SOURCE=dist/*
rm $DESTINATION/*
cp $SOURCE $DESTINATION
chown www-data:www-data $DESTINATION/*
