# Eze Backend

# Sole Contributor

Oladimeji Ojo

### The following dependencies were used:

- Node
- Express
- Mongoose
- Cors
- Helmet
- Dotenv
- Read-excel-file (Development)
- Nodemon (Development)
- Cross-Env (Development)
- SuperTest (Development)

## Getting Started

### Install dependencies

`npm install`

### Run Server

`npm run server`

## Auth Routes

## Get Devices

`GET /profile/coaches`

**GET** This will get all coaches

**Examples**

GET Coaches Success Response

```javascript
{
    "coaches": [
        {
            "id": 1,
            "first_name": "Jayne",
            "last_name": "Carmichael Norrie",
            "email": "jayne@musicisourforte.co.uk",
            "password": "$2a$10$3LmQzlDtk/1NYys6kn5Ea.FH680/SzfqPWNTC3X9qZQ9.a.I1Z3vi",
            "location": null,
            "role_id": 2,
            "user_id": 1,
            "avatar_url": "google.com",
            "experience_level": 1,
            "skill_level": 1,
            "description": "Jayne worked as a singing teacher for 9 years and is now studying with Lambda School",
            "rating": null,
            "hourly_rate": null,
            "contact_url": null
        }
      ]
    }
```

GET Coaches Error Response

```javascript
{
    "message": "Auth Failed"
}
```

## Get Appointments

`GET /appointment/:id`

Parameters

| Name |  Type  | Description         | Required |
| :--- | :----: | :------------------ | :------: |
| role | String | role_id of the user |   Yes    |

**GET** This will get all user appointments at the provided `id` (id is the coach.id or student id) and we need to send a body with an object = {"role": role_id} (role_id from the user)

**Examples**

GET Appointments Success Response

```javascript
{
    "appointments": [
        {
            "first_name": "Bob",
            "last_name": "Smith",
            "email": "bob@google.com",
            "experience_level": 1,
            "confidence_level": 1,
            "avatar_url": "www.stripe.com",
            "id": 1,
            "created_at": "2019-12-20T07:50:04.203Z",
            "appointment_datetime": null,
            "canceled": false,
            "appointment_topic": "Frontend"
        }
      ]
    }
```

GET Appointments Error Response

```javascript
{
    "message": "Auth Failed"
}
```
