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
exports.setSchedule = void 0;
const debug_1 = __importDefault(require("debug"));
const schedule = require('node-schedule');
const debug = (0, debug_1.default)('app:types:schedule');
function setSchedule() {
    var scheduleVar = schedule.scheduleJob('*/60 * * * * *', () => __awaiter(this, void 0, void 0, function* () {
        debug('schedule running');
    }));
}
exports.setSchedule = setSchedule;
