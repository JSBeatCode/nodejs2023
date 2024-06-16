import { Sequelize } from 'sequelize';
import debugModule from 'debug';
import _ from 'lodash';
import path from 'path';
import nconf from 'nconf';

const debug = debugModule('app:database');

export let sequelize: Sequelize;

nconf.use('memory');
nconf.argv().env().file({file: path.join(process.cwd(), 'config.json')});
const config = nconf;

export async function CreateDatastore() {
    const info = {
        host: config.get('db:host'),
        port: +config.get('db:port'),
        loginId: config.get('db:loginId'),
        loginPw: config.get('db:loginPw'),
    }
    // const info = {
    //     host: '127.0.0.1',
    //     port: +5432,
    //     loginId: 'postgres',
    //     loginPw: 'qwer1234',
    // }
    
    await connectDatastore(info).catch(err => debug('Error: ', err.toString()))
    
    return Promise.resolve();
}

export async function connectDatastore(info: any) {
    try {
        sequelize = new Sequelize('postgres', info.loginId, info.loginPw, {
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
        return sequelize.authenticate();
        
    } catch (err) {
        debug(err);
    }
}