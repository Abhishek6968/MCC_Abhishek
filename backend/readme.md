# POST  http://localhost:5000/api/users/register
{
    "email": "superadmin@gmail.com",
    "password": "123",
    "role_id": 1
}

# POST  http://localhost:5000/api/users/login
{
    "email": "superadmin@gmail.com",
    "password": "123"
}
                {
                    "message": "Login successful",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyYWRtaW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjQ1OTM3NCIsInJvbGVfaWQiOjEsImlhdCI6MTczMzk0ODk5MSwiZXhwIjoxNzMzOTUyNTkxfQ.6wqvrh7czcSHbHmQFesw0LgsxgrZ0V_yy3HZzlL2cuM",
                    "user": {
                        "user_id": "459374",
                        "role_id": 1,
                        "email": "superadmin@gmail.com"
                    }
                }


 # POST http://localhost:5000/api/states/add
 {
    "name":"Kerala"
}


# POST  http://localhost:5000/api/regions/add

{
    "state_id":1,
    "region_name":"RCC"
}


 # GET http://localhost:5000/api/states/view

 # GET  http://localhost:5000/api/regions/view
 [
    {
        "region_id": 4,
        "state_id": 4,
        "region_name": "RCC"
    }
]
  
GET http://localhost:5000/api/regions/view?state_id=4

[
    {
        "region_id": 4,
        "state_id": 4,
        "region_name": "RCC"
    }
]

# DELETE http://localhost:5000/api/regions/delete?region_id=7
    http://localhost:5000/api/regions/delete
    body:
    {
        "region_id": 4   
    }


# PUT http://localhost:5000/api/regions/edit?region_id=7
body:
    {
    "region_name": "MCC"
    }
output:
    {
    "message": "Region updated successfully"
    }

# GET http://localhost:5000/api/centers/view

[
    {
        "region_id": 6,
        "u_id": 1,
        "name": "Community Health Center",
        "contact_no": "9876543210",
        "email": "center@example.com"
    }
]

GET http://localhost:5000/api/centers/view?region_id=6

# POST http://localhost:5000/api/centers/add

{
    "region_id":"6", 
    "u_id":"3",
    "name":"Abhishek", 
    "contact_no":"8590060196", 
    "email":"ahi@gmail.com"
}

# PUT http://localhost:5000/api/centers/edit/1
{
    "region_id":"6", 
    "u_id":"3",
    "name":"Abhishek-OCR", 
    "contact_no":"8590068196"
}
# DELETE http://localhost:5000/api/centers/delete/2





