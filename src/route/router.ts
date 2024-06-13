import moment from 'moment'
import debugModule from 'debug';
import path from 'path';
import { graphql } from 'graphql';

const debug = debugModule('app:router');

function defaultPage(req: any, res: any, next: any) {
    debug("setPage");
    
    // if(something){
    //     res.redirect('/noauth')
    // }
    
    const params = {
        version: moment().unix()
    }
    
    // res.render('index', params)
    res.render('index', { title: 'My App', message: 'Hello, world!' });

}

export function setRouter(app: any, gqlServer: any){
    debug('setRouter')
    
    app.get('/login', defaultPage)
    
    app.get('/', (req: any, res: any, next: any)=>{
        res.redirect('/home')
    })
    
    app.get('/home', defaultPage)
    
    app.get('/about/?*', (req: any, res: any, next: any)=>{
        res.redirect('/home')
    })
    
    app.get('/download', (req: any, res: any)=>{
        const file = path.join(process.cwd(), 'file.xlsx')
        console.log(file);
        var time = moment().format('x')
        res.download(file, 'exceldoc' + time + '.xlsx')
    })

    // 기본 쿼리를 사용한 GraphQL 요청을 직접 수행하는 GET 방식 API 엔드포인트 추가
    app.get('/api/graphql', async (req: any, res: any) => {
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
        
        try {
            const result = await graphql({
                schema: gqlServer.schema,
                source: defaultQuery,
            });
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

} 