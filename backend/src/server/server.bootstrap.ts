import { createConnection } from 'typeorm';

import { PORT } from '../shared/config/server';

import app from './server.app';
import routes from './server.routes';

async function bootstrap() {
  await createConnection();

  app.use(routes);

  app.listen(PORT);
}
bootstrap();
