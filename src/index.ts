process.env.NODE_TLS_REJECT_UNAUTHORIZED = 'V';

import debugModule from 'debug';
debugModule.enable('app:*')

import { CreateServer } from '@webserver/web';
import { CreateDatastore } from '@db/Database';

const debug = debugModule('app:index');

debug(process.env.NODE_ENV);

Promise.resolve()
    .then(CreateDatastore)
    .then(CreateServer)
    .then(()=>{
        debug("server initialized.")
    })
    .catch((err)=>{
        debug(err.toString());
        debug(err);
    })