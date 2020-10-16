import _merge from 'lodash/merge';
import path from 'path';

const env = process.env.APP_ENV || 'development';

// eslint-disable-next-line import/no-mutable-exports
let base = {
  env,
  port: process.env.PORT || 3002,
  isDev: env === 'development',
  isTest: env === 'test',
};

const envConfig = require(`./${env}.json`); // eslint-disable-line import/no-dynamic-require

base = _merge(base, envConfig || {});
base.landingLoginUrl = `${base.landingUrl}/signin`;

const loadLocalConfig = (name) => {
  const localConfigPath = path.join(__dirname, name);

  try {
    const localConfig = require(localConfigPath); // eslint-disable-line import/no-dynamic-require, global-require
    base = _merge(base, localConfig);
    console.log(`loaded ${localConfigPath} config`); // eslint-disable-line no-console
  } catch (e) {
    if (base.isDev || base.isTest) {
      console.log(`${localConfigPath} not found`); // eslint-disable-line no-console
    }
  }
};

// local file can be used to customize any config values during development
if (base.env === 'test') {
  loadLocalConfig('test-local.js');
} else {
  loadLocalConfig('local.js');
}

export default base;
