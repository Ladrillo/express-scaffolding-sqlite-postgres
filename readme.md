MAKE A GOOD README SO THE FRONT END DEV
CAN SPIN UP THE SERVER EASILY ON THEIR COMPUTER!!!

During the development process, the React devs should always spin up the backend on their machines and develop against it. The backend code is run in a separate window of VSCode and is kept updated by doing git pull, deleting the SQLite db and re-running scripts.

Here are the steps.

1. Front end devs will clone the backend repo as soon as it's functional, install, run the migration script and run the start script.

1. The React code should should use "dynamic" URLs for the endpoints. If process.env.NODE_ENV is "development", the base URL for the endpoints should be something like http://localhost:4400. If it's "production", it should be something like https://someapp.herokuapp.com. The NODE_ENV will be one or the other depending on whether the frontend was bundled with `start` or with `build`.

1. The React devs can see when new commits are pushed to the master branch of the backend repo thanks to VSCode. To develop against the latest and greatest, they should (A) delete their local SQLite db (because the migration code might have changed), (B) pull the latest, and (C) re-run the install, migration and start scripts.

1. The backend devs should include instructions for the front end devs in the readme, on how to spin up the server locally.

1. Pair programming is strongly recommended to ensure the frontend dev can get the backend up.
In a little bit we'll have a session with students to walk them through all of this.