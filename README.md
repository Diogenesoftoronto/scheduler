



# Interview Scheduler

## About
The interview alalows users to create, delete and edit interviews they have with students. Students can also view their interviews and their interview schedule.
When editing an interview, the user will recieve a confirmation message before being able to edit it. This is to make sure that the user is editing the correct interview. When a user edits an interview, the interview will be updated and see these changes without reloading the page.
The same thing happens when deleting an interview. The user will recieve a confirmation message before being able to delete it. This is to make sure that the user is deleting the correct interview. When a user deletes an interview, the interview will be deleted and see these changes without reloading the page.
When a user saves an interview no confirmation message will be displayed.
The user will see a loading message while the interview is being saved. On success, the user will see the interview. On failure, the user will see an error message. The user will be able to close the error message and try again to create an interview.

## Video
![Introduction to the Application](https://user-images.githubusercontent.com/87236699/152902885-0da8a2e3-1e72-491d-b24f-662f00fc0ede.mp4)
## Dependencies

    React
    Webpack, Babel
    Axios, WebSockets
    Axios
    Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application is created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Running Cypress

```sh
npm run cypress
```
