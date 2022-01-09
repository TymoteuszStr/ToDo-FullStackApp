#!/bin/sh

sudo service mongod start
echo "mongo db is running..."
sudo service mongod status
( cd frontend && code .)
( cd backend && code .)
gnome-terminal --title="backend" -- bash run-backend.sh
gnome-terminal --title="frontend" -- bash run-frontend.sh



