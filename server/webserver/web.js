"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServer = void 0;
const debug_1 = __importDefault(require("debug"));
const express_1 = __importDefault(require("express"));
const method_override_1 = __importDefault(require("method-override"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const GraphqlServer_1 = require("../graphql/GraphqlServer");
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const Routers_1 = require("../route/Routers");
const schedule_1 = require("../scheduler/schedule");
const http_1 = __importDefault(require("http"));
const Sequelizer_1 = require("../db/Sequelizer");
// import { ApolloServer, gql } from 'apollo-server-express';
const debug = (0, debug_1.default)('app:server'); // Create a debug instance for logging server messages
function CreateServer() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const app = (0, express_1.default)(); // Create an express application instance
            // Configure view engine (commented out, might be used later)
            // app.set('views', path.join(process.cwd(), 'public', 'views'))
            app.set('views', path_1.default.join(process.cwd(), 'public')); // Set the view directory for templating engine (likely EJS)
            app.set('view engine', 'ejs'); // Set the templating engine to EJS
            app.use(express_1.default.json({ limit: '1mb' })); // Parse incoming JSON requests with a size limit of 1mb
            app.use(express_1.default.urlencoded({ extended: false, limit: '1mb' })); // Parse incoming form data with a size limit of 1mb
            app.use((0, method_override_1.default)()); // Enable method override for PUT and DELETE requests
            app.use((0, cookie_parser_1.default)('1234567890abcdefghijklmnopqrstuvwxyz')); // Parse cookies from requests using a secret key
            app.use((0, helmet_1.default)()); // Use helmet middleware to add security headers
            yield (0, GraphqlServer_1.setGQL)(app); // Call the function to set up GraphQL functionality on the app
            yield (0, Sequelizer_1.setSequelize)(); // Call the function to set up the Sequelize ORM
            app.use((0, express_session_1.default)({
                secret: 'secret code', // Use a secret key to encrypt session data
                resave: true, // Always save the session object even if unmodified
                saveUninitialized: true, // Create a session object even if no data is stored
            }));
            // Serve static files (commented out, might be used later)
            // app.use(express.static(path.join(process.cwd(), 'dist'))) // Serve static files from the 'dist' directory
            // app.use('/', express.static(path.join(process.cwd(), '_static'), { maxAge: 0 })) 
            // app.use('/', express.static(path.join(process.cwd(), 'public', 'assets'), { maxAge: 60 * 60 * 1000 })) 
            // app.use('/vendors', express.static(path.join(process.cwd(), 'public', 'vendors'), { maxAge: 60 * 60 * 1000 })) 
            yield (0, Routers_1.setRouter)(app); // Call the function to set up routes for the application
            (0, schedule_1.setSchedule)(); // Call the function to set up any scheduled tasks
            // Log the current environment (commented out, might be useful for debugging)
            // console.log(process.env.NODE_STAGE)
            const port = 3333; // Set the port number for the server
            const httpServer = http_1.default.createServer(app); // Create an HTTP server using the express app
            httpServer.listen(port, () => {
                debug(`server started at ${port}`); // Log a message using the debug instance
                return resolve(); // Resolve the promise when the server starts successfully
            });
        }));
    });
}
exports.CreateServer = CreateServer;
