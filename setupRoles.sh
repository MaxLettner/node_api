#!/bin/bash

curl -X DELETE localhost:3000/role/purge > /dev/null 2>&1
curl -X POST localhost:3000/role -H 'Content-Type: application/json' -d '{"id": 1, "title": "Generic"}' > /dev/null 2>&1
curl -X POST localhost:3000/role -H 'Content-Type: application/json' -d '{"id": 2, "title": "User"}' > /dev/null 2>&1
curl -X POST localhost:3000/role -H 'Content-Type: application/json' -d '{"id": 3, "title": "Admin"}' > /dev/null 2>&1

echo 'roles setup succesful'

