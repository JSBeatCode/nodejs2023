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
exports.connectDatastore = exports.CreateDatastore = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const debug_1 = __importDefault(require("debug"));
const path_1 = __importDefault(require("path"));
const nconf_1 = __importDefault(require("nconf"));
const debug = (0, debug_1.default)('app:database');
nconf_1.default.use('memory');
nconf_1.default.argv().env().file({ file: path_1.default.join(process.cwd(), 'config.json') });
const config = nconf_1.default;
function CreateDatastore() {
    return __awaiter(this, void 0, void 0, function* () {
        const info = {
            host: config.get('db:host'),
            port: +config.get('db:port'),
            loginId: config.get('db:loginId'),
            loginPw: config.get('db:loginPw'),
        };
        // const info = {
        //     host: '127.0.0.1',
        //     port: +5432,
        //     loginId: 'postgres',
        //     loginPw: 'qwer1234',
        // }
        yield connectDatastore(info).catch(err => debug('Error: ', err.toString()));
        return Promise.resolve();
    });
}
exports.CreateDatastore = CreateDatastore;
function connectDatastore(info) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            exports.sequelize = new sequelize_1.Sequelize('postgres', info.loginId, info.loginPw, {
                host: info.host,
                port: info.port,
                dialect: 'postgres',
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            });
            debug('sequelize.authenticate');
            return exports.sequelize.authenticate();
        }
        catch (err) {
            debug(err);
        }
    });
}
exports.connectDatastore = connectDatastore;
