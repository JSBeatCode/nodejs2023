import debugModule from 'debug'
import express from 'express'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import helmet from 'helmet';
import { setGQL } from '../graphql/GraphqlServer';
import sessionParser from 'express-session'
import path from 'path';
import { setRouter } from '../route/Routers';
import { setSchedule } from '../scheduler/schedule';
import http from 'http'
import { setSequelize } from '../db/Sequelizer';
// import { ApolloServer, gql } from 'apollo-server-express';

const debug = debugModule('app:server'); // Create a debug instance for logging server messages

export async function CreateServer() {
    return await new Promise<void>(async (resolve, reject) => {
        const app = express(); // Create an express application instance

        // Configure view engine (commented out, might be used later)
        // app.set('views', path.join(process.cwd(), 'public', 'views'))

        app.set('views', path.join(process.cwd(), 'public')); // Set the view directory for templating engine (likely EJS)
        app.set('view engine', 'ejs'); // Set the templating engine to EJS

        app.use(express.json({ limit: '1mb' })); // Parse incoming JSON requests with a size limit of 1mb
        app.use(express.urlencoded({ extended: false, limit: '1mb' })); // Parse incoming form data with a size limit of 1mb

        app.use(methodOverride()); // Enable method override for PUT and DELETE requests

        app.use(cookieParser('1234567890abcdefghijklmnopqrstuvwxyz')); // Parse cookies from requests using a secret key

        app.use(helmet()); // Use helmet middleware to add security headers

        await setGQL(app); // Call the function to set up GraphQL functionality on the app

        await setSequelize(); // Call the function to set up the Sequelize ORM

        app.use(sessionParser({ // Configure session management
            secret: 'secret code', // Use a secret key to encrypt session data
            resave: true, // Always save the session object even if unmodified
            saveUninitialized: true, // Create a session object even if no data is stored
        }));

        // Serve static files (commented out, might be used later)
        // app.use(express.static(path.join(process.cwd(), 'dist'))) // Serve static files from the 'dist' directory

        // app.use('/', express.static(path.join(process.cwd(), '_static'), { maxAge: 0 })) 
        // app.use('/', express.static(path.join(process.cwd(), 'public', 'assets'), { maxAge: 60 * 60 * 1000 })) 
        // app.use('/vendors', express.static(path.join(process.cwd(), 'public', 'vendors'), { maxAge: 60 * 60 * 1000 })) 

        await setRouter(app); // Call the function to set up routes for the application

        setSchedule(); // Call the function to set up any scheduled tasks

        // Log the current environment (commented out, might be useful for debugging)
        // console.log(process.env.NODE_STAGE)

        const port = 3333; // Set the port number for the server

        const httpServer = http.createServer(app); // Create an HTTP server using the express app

        httpServer.listen(port, () => { // Start listening on the specified port
            debug(`server started at ${port}`); // Log a message using the debug instance
            return resolve(); // Resolve the promise when the server starts successfully
        });
    });
}