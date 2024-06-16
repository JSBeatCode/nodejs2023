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
exports.setSequelize = exports.Book = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../db/Database");
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('app:dao');
function setSequelize() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Define the 'books' model
            exports.Book = Database_1.sequelize.define('book', {
                title: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                author: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
            });
            // Synchronize the model with the database (create the 'books' table if not exists)
            yield exports.Book.sync();
        }
        catch (err) {
            debug('Unable to connect to the database:', err);
        }
    });
}
exports.setSequelize = setSequelize;
