# api.technical.test

`api.technical.test` is a solution of the [Stuard second test](https://github.com/StuartHiring/solutions-engineers/tree/master/second_test).

**Usage**
---

```
Usage: make [target]

  Securely configure your Mac.
  Developed by Aaron Lichtman -> (Github: alichtman)

Available targets:
 help:            Help
 install:         Install project
 start:           Start project with Docker
 create_courier:  Create courier (params: CAPACITY, COURIER)
 get_courier_with_capacity: Search couriers (params: CAPACITY)
 assign_to_courier: Assign parcel to courier (params: PARCEL, COURIER)
 deliver_to_customer: Declare parcel as deliverd (params: PARCEL, COURIER, CUSTOMER)
```

**Installation Options**
---

1. Install with [`docker`](https://www.docker.com)
    + `$ cd server`
    + `$ make install`
    + `$ make start ENV=dev`

2. Install locally
    + `$ cd server`
    + `$ npm install`
    + `$ npm run start:dev`

_Developpment made with node.js v14_

**Configuration Options**
---

1. Courier

    + Identifier to test the api
        - Number for an implementation like MySQL

2. Parcel

    + Identifier to test the api
    	- Number for an implementation like MySQL
      - No check when used in queries

3. Customer

    + Identifier to test the api
    	- Number for an implementation like MySQL
      - No check when used in queries

4. Capacity

    + Unique value for both max_capacity or capacity_required to test the api

**Development**
---

1. Code style

    + Prettier is installed to avoid code style differences (can be used in git prehook)

2. Environment

    + Reduce production/local environements differences by using containered applications (with Docker)

**Going further**
---

1. Data storage

    + Do not use in-memory storage (except in test environment)

2. Test

    + Create end-to-end scenari collection to test api routes

3. Development

    + An event-source pattern is added to the POC, it allows to separate concerns and to not mix read/write instructions
    + Each event describes a part of the parcel/courier/delivry/customer lifecycle (when a parcel is delivered, when a parcel is assigned to a courier, when a new customer is created)

4. Data analysis

    + After creating event matrix, designing tracking cases and developing event handlers, some data visualisation dashboard could be implemented (metabase/redash, custom ETL…)

3. Deployment

    + Install dependencies
    + Create AWS credentials
    + Create serverless configuration
    + Turn the server into lambda

```
npm install -g serverless
npm install --save aws-serverless-express
npm install --save aws-lambda
```
