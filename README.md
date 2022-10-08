To run this project you should have been installed Docker
command to run :

- npm run doc

Api Query:
localhost:4000/account/create
body: {
"username": "name",
"phone": "38054",
"date": "490358345345",
"balans": 0
}

localhost:4000/account/byid
body: {
"id": "6340204113d5a74812547ec9"
}

localhost:4000/account/getAll

localhost:4000/account/transaction
body: {
"id_lend": "63412fa725bba275b7d69a80",
"id_get" : "63413007536e0f10df18e675",
"amount": 0.0
}
