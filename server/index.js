"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 'V';
const debug_1 = __importDefault(require("debug"));
debug_1.default.enable('app:*');
const web_1 = require("./webserver/web");
const database_1 = require("./db/database");
const debug = (0, debug_1.default)('app:index');
debug(process.env.NODE_ENV);
Promise.resolve()
    .then(database_1.CreateDatastore)
    .then(web_1.CreateServer)
    .then(() => {
    debug("server initialized.");
})
    .catch((err) => {
    debug(err.toString());
    debug(err);
});
