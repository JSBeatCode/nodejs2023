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
const graphql_1 = require("../middleware/graphql");
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const router_1 = require("../route/router");
const schedule_1 = require("../scheduler/schedule");
const http_1 = __importDefault(require("http"));
// import { ApolloServer, gql } from 'apollo-server-express';
const debug = (0, debug_1.default)('app:server');
function CreateServer() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const app = (0, express_1.default)();
            // app.set('views', path.join(process.cwd(), 'public', 'views'))
            // app.set('views', path.join(process.cwd(), 'dist', 'views'))
            app.set('views', path_1.default.join(process.cwd(), 'public'));
            app.set('view engine', 'ejs');
            app.use(express_1.default.json({ limit: '1mb' }));
            app.use(express_1.default.urlencoded({ extended: false, limit: '1mb' }));
            app.use((0, method_override_1.default)()); // HTTP 요청 메소드 오버라이드 (delete, put 도 가능)
            app.use((0, cookie_parser_1.default)('1234567890abcdefghijklmnopqrstuvwxyz')); // req.cookie 가능
            // app.use(helmet());// 보안 헤더 설정
            /** gql setting start ******************************************/
            const gqlServer = yield (0, graphql_1.setGQL)(app);
            /** gql setting end ******************************************/
            app.use((0, express_session_1.default)({
                secret: 'secret code',
                resave: true,
                saveUninitialized: true
            })); // req.session 가능
            // app.use(express.static(path.join(process.cwd(), 'dist'))) // frontend
            // app.use('/', express.static(path.join(process.cwd(), '_static'), { maxAge: 0 })) 
            // app.use('/', express.static(path.join(process.cwd(), 'public', 'assets'), { maxAge: 60 * 60 * 1000 })) 
            // app.use('/vendors', express.static(path.join(process.cwd(), 'public', 'vendors'), { maxAge: 60 * 60 * 1000 })) 
            yield (0, router_1.setRouter)(app);
            (0, schedule_1.setSchedule)();
            // console.log(process.env.NODE_STAGE)
            // const PORT = 4432;
            // app.listen(PORT, () => {
            //   console.log(`Server is running at http://localhost:${PORT}`);
            // })
            let port = 3333;
            const httpServer = http_1.default.createServer(app);
            httpServer.listen(port, () => {
                debug(`server started at ${port}`);
                return resolve();
            });
        }));
    });
}
exports.CreateServer = CreateServer;
