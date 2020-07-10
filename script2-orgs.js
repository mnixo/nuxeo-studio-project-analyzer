const utils = require('./utils');

const url = 'https://connect.nuxeo.com/nuxeo/site/nos/orgs';
const credentials = utils.read('credentials.json');
utils.fetch(url, credentials, true).then(orgs => utils.store('orgs.json', orgs));
