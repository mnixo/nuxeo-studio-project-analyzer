const btoa = require('btoa');
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {

  fetch: function(url, credentials, asJson, minimumTime) {
    const timeBefore = Date.now();
    return fetch(url, {
      headers: {
        'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.token}`),
      },
    }).then(response => asJson ? response.json() : response.text()).then(async (json) => {
      if (minimumTime) {
        const timeAfter = Date.now();
        const timeDifference = timeAfter - timeBefore;
        if (timeDifference < minimumTime) {
          await this.sleep(minimumTime - timeDifference);
        }
      }
      return json;
    });
  },

  read: function(targetPath) {
    return JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  },

  sleep: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  store: function(targetPath, data) {
    fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
    console.log(`${targetPath} stored.`);
  },

}
