# A Couchsurfing-like App

This is a personal project aiming to show my development skills. So in case you run into any error or code block to improve, ill be very thankful if you give a feedback.

## Feedback

If you have any feedback, please reach out to me at osmdrcn@gmail.com

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGODB_URL`

`JWT_SECRET`

`JWT_LIFETIME`

## Run Locally

https://github.com/osmnfdrcn/couchsurfing.git
To deploy this project run

```bash
* clone the project
  git clone https://github.com/osmnfdrcn/couchsurfing.git
* cd couchsurfing/
   npm run install-dependencies
   npm run start
```

## API Reference

#### Get all users

```http
  GET /api/v1/users
```

| Parameter | Type     | Description                                               |
| :-------- | :------- | :-------------------------------------------------------- |
| `city`    | `string` | **Not Required**. City of the users to fetch              |
| `minAge`  | `number` | **Not Required**. Minimum age of the users to fetch       |
| `maxAge`  | `number` | **Not Required**. Maximum age of the users to fetch       |
| `nights`  | `number` | **Not Required**. Number of nights users to host to fetch |

#### Get info of user logged in

```http
  GET /api/v1/users/me
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. id of the user |

#### Register User

```http
  POST /api/v1/users/register
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `name`     | `string` | **Required**. Name of the user         |
| `email`    | `string` | **Required**. email age of the user    |
| `password` | `string` | **Required**. password age of the user |

#### Login User

```http
  POST /api/v1/users/login
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `email`    | `string` | **Required**. email age of the user    |
| `password` | `string` | **Required**. password age of the user |

#### Logout User

```http
  POST /api/v1/users/logout
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. id of the user |

#### Get the profile of any single user

```http
  GET /api/v1/users/profile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

#### Get all users

```http
  PATCH /api/v1/users/updateProfile
```

| Parameter          | Type     | Description                                      |
| :----------------- | :------- | :----------------------------------------------- |
| `name`             | `string` | **Not Required**. Name of the user               |
| `email`            | `string` | **Not Required**. Email of the user              |
| `password`         | `string` | **Not Required**. Password of the user           |
| `age`              | `number` | **Not Required**. Age of the user                |
| `city`             | `string` | **Not Required**. City of the user               |
| `country`          | `number` | **Not Required**. Country of the user            |
| `hosting`          | `object` | **Not Required**. Hosting details of the user    |
| `rules`            | `array`  | **Not Required**. hosting rules of user          |
| `countriesVisited` | `array`  | **Not Required**. List of countries user visited |

#### Update Profile Photo

```http
  POST /api/v1/users/avatar
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `avatar`  | `string` | **Required**. avatar of user |

#### Get Profile Photo

```http
  GET /api/v1/users/:id/avatar
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. id of user |

#### Get Requests

```http
  GET /api/v1/requests
```

| Parameter | Type     | Description                                                          |
| :-------- | :------- | :------------------------------------------------------------------- |
| `type`    | `string` | **Required**. type of request('received'/'sent')                     |
| `status`  | `string` | **Not Required**. status of request('accepted'/'declined'/'pending') |

#### Make A Request

```http
  POST /api/v1/requests
```

| Parameter        | Type     | Description                              |
| :--------------- | :------- | :--------------------------------------- |
| `fromUser`       | `string` | **Required**. user making the request    |
| `toUser`         | `string` | **Required**. user receiving the request |
| `fromDate`       | `string` | **Required**. starting from              |
| `toDate`         | `string` | **Required**. ending at                  |
| `message`        | `string` | **Not Required**. message                |
| `numberOfNights` | `string` | **Required**. number of nights           |

#### Respond A Request

```http
  POST /api/v1/requests/responde
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`      | `string` | **Required**. user id making the request |
| `status`  | `string` | **Required**. status(accepted/declined)  |

#### Cancel A Request

```http
  DELETE /api/v1/requests
```

| Parameter   | Type     | Description                           |
| :---------- | :------- | :------------------------------------ |
| `requestId` | `string` | **Required**. id of request to cancel |

#### Leave A Comment

```http
  POST /api/v1/comments
```

| Parameter     | Type     | Description                                 |
| :------------ | :------- | :------------------------------------------ |
| `id`          | `string` | **Required**. id of user to leave a comment |
| `commentText` | `string` | **Required**. comment text                  |

#### Get Comments

```http
  GET /api/v1/comments
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | **Required**. id of user to get all comments |

## License

[MIT](https://choosealicense.com/licenses/mit/)
