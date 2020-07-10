const readlineSync = require('readline-sync');
const utils = require('./utils');

const credentials = {};
credentials.username = readlineSync.question('Username: ');
credentials.token = readlineSync.question('Token: ', { hideEchoBack: true });
utils.store('credentials.json', credentials);
