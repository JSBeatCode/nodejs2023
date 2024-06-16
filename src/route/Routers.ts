import moment from 'moment'
import debugModule from 'debug';
import path from 'path';
import { gqlServer } from '@graphql/GraphqlServer';
import { addBookMutation, defaultQuery } from '@graphql/Queries';

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

export async function setRouter(app: any) {

    debug('setRouter')

    app.get('/login', defaultPage)

    app.get('/', (req: any, res: any, next: any) => {
        res.redirect('/home')
    })

    app.get('/home', defaultPage)

    app.get('/about/?*', (req: any, res: any, next: any) => {
        res.redirect('/home')
    })

    app.get('/download', (req: any, res: any) => {
        const file = path.join(process.cwd(), 'file.xlsx')
        console.log(file);
        var time = moment().format('x')
        res.download(file, 'exceldoc' + time + '.xlsx')
    })

    // 기본 쿼리를 사용한 GraphQL 요청을 직접 수행하는 GET 방식 API 엔드포인트 추가
    app.get('/api/graphql', async (req: any, res: any) => {
        // 기본 쿼리 정의
        
        try {
            const { data } = await gqlServer.executeOperation({
                query: defaultQuery,
            });
            debug(data)
            res.json(data);

        } catch (error: any) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    });

    // REST API 엔드포인트 추가 (POST 방식으로 책 추가하기)
  app.post('/api/books', async (req: any, res: any) => {
    const { title, author } = req.body;
    debug(req.body)
    debug(title)
    debug(author)
    try {
      const { data }: any = await gqlServer.executeOperation({
        query: addBookMutation,
        variables: { title, author },
      });
      debug(data)
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

} 