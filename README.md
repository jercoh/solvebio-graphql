# graphql-server
GraphQL server with SolveBio

**Example GraphQL query:**
```
user(id: "1") {
  name
  friends {
    name
  }
}
```

**Example response:**
```json
{
  "data": {
    "user": {
      "name": "John Doe",
      "friends": [
        {
          "name": "Friend One"
        },
        {
          "name": "Friend Two"
        }]
      }
    }
  }
```

**Example GraphQL mutation:**
```
mutation updateUser($userId: String! $name: String!) {
  updateUser(id: $userId name: $name) {
    name
  }
}
```

## Used technologies

* GraphQL
* SolveBio-JS
* Node/IO.js
* Babel

### server
```
npm install
npm run start

```

### client
```
npm run client
```

## How to test

```
npm test
```
