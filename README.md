# Late night brunch

This is a school assignment where we were assignt to create a resturant page with the ablility to create a reservation onto an database using react with typescript. And then be able to edit it trough an admin page. Trough every request the user gets an email confirmation of either a cancellation or confirmation of a reservation.

## View live page
https://late-night-brunch.netlify.app/

## How to get started

1.  run `git clone https://github.com/PegJac/Restaurant.git`
2.  run `npm intall` to insta node modules and all the npm packages we chosen to use in this project.
3.  run `npm start`

## File Structure

For this project we decided on this file structure.

#### Prettier

- Is used to have the same compilation settings for the whole group, to minimize github hub conflicts

#### Assets

- Is where we have all our images

#### Components

- Houses all the parent components and child components in a seperate folder.

#### model

- This is where we mould our models that can be used trough out the application.

#### Styles

- Is where we have all our styling for the application, and uses the partials folder for reusable variables.

#### Svgs

- This folder contains the the few svgs images we have.

#### Utils

- Houses most of our function to keep a tidy code

```bash
project
│   README.md
│   .prettierrc.json
│
└───src
│   └───assets
│   └───components
│   │   └───ChildComponents
│   └───models
│   └───styles
│   │    └───Partials
│   └───svgs
│   └───utils
│   │
│   │   Firebase

```

## Firebase/Firestore
- This is where we inistiate our chosen database that we use throughout the whole application
- We use firebase hooks to minimize the amount of backend code. Firebase hooks can handle state, update dynamically on database changes in real time. 
- Easy to use functions.

## EmailJS
- Link to cancel booking is: http://localhost:3000/cancellation/%7B%7Bbooking_reference%7D%7D
- To use this feature you have to use port 3000.

## Running Tests

To run tests, run the following command

```bash
  npm run test
```
