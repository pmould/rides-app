/**
 * @module server
 *
 * Fabrix framework.
 * @see {@link http://fabrix.app}
 */

import { FabrixApp } from '@fabrix/fabrix'
import * as App from '.'
import * as Boom from 'boom';

const server = new FabrixApp(App)


process.on('unhandledRejection', (reason, p) => {
  console.error(reason, 'Unhandled Rejection at Promise', p);
});

process.on('uncaughtException', err => {
  console.error(err, 'Uncaught Exception thrown');
  process.exit(1);
});




server.start().then(app => {
  app.hapiServer.ext('onPreResponse', (request, h) => {
      const response = request.response;
      if (request.response.isBoom && request.response.isServer) {
        const error = request.response.error || request.response.message;
        app.hapiServer.log([ 'error' ], error);
        console.error(request.response);
        return request.response;
      }
      else {
        return h.continue;
      }
  });
  return app;
})
  .catch((err: any) => server.stop(err))
