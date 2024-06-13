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
exports.setRouter = void 0;
const moment_1 = __importDefault(require("moment"));
const debug_1 = __importDefault(require("debug"));
const path_1 = __importDefault(require("path"));
const graphql_1 = require("../middleware/graphql");
const debug = (0, debug_1.default)('app:router');
function defaultPage(req, res, next) {
    debug("setPage");
    // if(something){
    //     res.redirect('/noauth')
    // }
    const params = {
        version: (0, moment_1.default)().unix()
    };
    // res.render('index', params)
    res.render('index', { title: 'My App', message: 'Hello, world!' });
}
function setRouter(app) {
    return __awaiter(this, void 0, void 0, function* () {
        debug('setRouter');
        app.get('/login', defaultPage);
        app.get('/', (req, res, next) => {
            res.redirect('/home');
        });
        app.get('/home', defaultPage);
        app.get('/about/?*', (req, res, next) => {
            res.redirect('/home');
        });
        app.get('/download', (req, res) => {
            const file = path_1.default.join(process.cwd(), 'file.xlsx');
            console.log(file);
            var time = (0, moment_1.default)().format('x');
            res.download(file, 'exceldoc' + time + '.xlsx');
        });
        // 기본 쿼리를 사용한 GraphQL 요청을 직접 수행하는 GET 방식 API 엔드포인트 추가
        app.get('/api/graphql', (req, res) => __awaiter(this, void 0, void 0, function* () {
            // 기본 쿼리 정의
            const defaultQuery = `
        {
            hello
            books {
                title
                author
            }
        }
        `;
            // console.log(gqlServer)
            try {
                const { data } = yield graphql_1.gqlServer.executeOperation({
                    query: defaultQuery,
                });
                console.log('jsdno0 debug1-2');
                res.json(data);
                // const result = await graphql({
                //     schema: gqlServer.schema,
                //     source: defaultQuery,
                // });
                // console.log('jsdno0 debug1-2')
                // res.json(result);
            }
            catch (error) {
                console.log('jsdno0 debug1-3');
                console.log(error);
                res.status(500).json({ error: error.message });
            }
        }));
    });
}
exports.setRouter = setRouter;
