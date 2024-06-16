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

const debug = debugModule('app:server');

export async function CreateServer(){
    return await new Promise<void>( async (resolve, reject)=>{
        const app: any = express();
        
        // app.set('views', path.join(process.cwd(), 'public', 'views'))
        
        app.set('views', path.join(process.cwd(), 'public'));
        app.set('view engine', 'ejs');
        
        app.use(express.json({ limit: '1mb' }))
        app.use(express.urlencoded({ extended: false, limit: '1mb' }))
        
        app.use(methodOverride()) // HTTP 요청 메소드 오버라이드 (delete, put 도 가능)
        app.use(cookieParser('1234567890abcdefghijklmnopqrstuvwxyz')); // req.cookie 가능
        app.use(helmet());// 보안 헤더 설정
        
        
        await setGQL(app);

        await setSequelize();

        app.use(sessionParser({
            secret: 'secret code',
            resave: true,
            saveUninitialized: true
        })) // req.session 가능
        
        // app.use(express.static(path.join(process.cwd(), 'dist'))) // frontend
        
        // app.use('/', express.static(path.join(process.cwd(), '_static'), { maxAge: 0 })) 
        // app.use('/', express.static(path.join(process.cwd(), 'public', 'assets'), { maxAge: 60 * 60 * 1000 })) 
        // app.use('/vendors', express.static(path.join(process.cwd(), 'public', 'vendors'), { maxAge: 60 * 60 * 1000 })) 
        
        await setRouter(app);
        setSchedule();
        
        // console.log(process.env.NODE_STAGE)
        
        let port = 3333;
        const httpServer = http.createServer(app);
        httpServer.listen(port, () => {
            debug(`server started at ${port}`)
            return resolve();
        })
    })
}
