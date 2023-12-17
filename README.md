# PraiseTheSale

To get it up and running, you need to follow these steps:

## Frontend

- First, you need to have Node JS with npm installed, or any other compatible dependency manager.
- Then, you need to run `npm install`, and with that, the React dependencies should be set up.
- To run it, simply type `npm start`, which will start it in development mode.

## Backend

- For the backend, you first need to configure the database-related settings. Therefore, you need to navigate to the `app.properties` file inside `src/main/resources`, and set up the database-related settings, mainly these lines:

```properties
spring.datasource.url=jdbc:mysql://YOUR_LOCALHOST_URL/YOUR_DATABASE_NAME?serverTimezone=UTC
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

Similarly, it will also be necessary to modify the lines related to the email dedicated to the app, i.e., the email that will act as the store's own email, to send messages to users when something happens within the application, such as the deletion of a product, account suspension, etc. It should preferably be a Google email, but other providers can also be used. The same `app.properties` file needs to be modified, in the following lines:

```properties
spring.mail.username=YOUR_APP_EMAIL
spring.mail.password=YOUR_APP_EMAIL_PASSWORD

```
