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

`npm run devStart`

## Get Devices

`GET /sell?page=1&limit=16`

**GET** This will get all devices with a required limit query

**Examples**

GET Paginated Sell Requests Success Response

```javascript
{
    "results": [
      {
            "_id": "5ee11bf235fbe752808fb68d",
            "name": "iPhone XS Max",
            "condition": "New",
            "storage": "64GB",
            "price": "1160",
            "__v": 0
        },
      ]
    }
```

`GET /buy`

**Examples**

GET Buy Requests Success Response

```javascript
[
  {
    _id: "5ed79d83fe03852978ebc2b9",
    name: "iPhoneX",
    storage: "64GB",
    condition: "A1",
    price: "$1,000",
    __v: 0,
  },
];
```

## Post Devices

`POST /sell`

**Examples**

POST Sell Requests expected format

```javascript
[
  {
    name: "",
    storage: "",
    condition: "",
    price: "",
  },
];
```

`POST /buy`

**Examples**

POST Buy Requests expected format

```javascript
[
  {
    name: "",
    storage: "",
    condition: "",
    price: "",
  },
];
```
