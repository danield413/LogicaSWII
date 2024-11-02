import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'sistema',
  connector: 'mongodb',
  url: 'mongodb+srv://estilourbano1:estilourbano123@estilourbano.mfndg.mongodb.net/sistemaDB',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'sistemaDB',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SistemaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'sistema';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.sistema', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
