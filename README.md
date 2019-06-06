# Graphql_react
An online shopping platform built with Graphql and React


## Hosting
* The Prisma server is hosted on https://ama-sick-fits-prod-a842d36ded.herokuapp.com/
* The Backend is hosted on https://amara-sick-fits-prod.herokuapp.com/
* The Frontend is hosted on https://amara-sick-fits-next.herokuapp.com/

## Technologies used
* JavaScript
* NodeJS
* Yoga
* Prisma
* React
* GraphQL
* Apollo
* Stripe

## Features
* Users can view all items for sale
* Users can view an item's details
* Users can search for an item
* Users can register in the application.
* Registered users can log in into the application.
* Registered users can create/sell an item in the application.
* Registered users can add an item to cart
* Registered users can pay for orders
* Registered users can request password reset
* Registered users can return a borrowed book.
* Admin can manage permissions.
* Admin/ item creator can update or delete an item

## Installation and setup

### BACKEND
1. Install [`NodeJS`](https://nodejs.org/en/download/)
2. Clone the repository using the command
    ```
    git clone https://github.com/amarachukwu-agbo/Graphql_react.git
    ```
3. Change directory to the project's backend directory using the command
    ```
    cd backend
    ```
4. Install project's dependencies using the command
    ```
    npm install
    ```
5. Go to the [Prisma site](https://www.prisma.io/) and sign up. Obtain the `PRISMA_ENDPOINT` assigned to you and fill it the slot allocated to it in `variables.env`.

6. Run `npm run deploy` to deploy the model to the prisma database

7. Sign up with any SMTP service like [mailtrap](https://mailtrap.io/) and use assigned details to populate the following fields in `variables.env.sample` - `MAIL_HOST`, `MAIL_PORT`, `MAIL_PASS`, `MAIL_USER`

8. Sign up with [Stripe](https://stripe.com/) and use assigned stripe token to populate the `STRIPE_SECRET` in `variables.env.sample`.

9. Start the application
    * Start the backend with ```
    npm run dev```

### FRONTEND
1. Navigate to the project's frontend directory using the command
    ```
    cd frontend
    ```
2. Install project's dependencies using the command
    ```
    npm install
    ```
3. Start the client with ```
    npm run dev ```

4. Open the browser and run the application on the address
    ```
    http://localhost:7777
    ```

## Testing

### Client-side tests
- Implememted with `Jest`, `Enzyme`
  Run the command
  ```
    cd frontend && npm run test
  ```

## Limitations
- No backend tests
- Orders cannot be cancelled
