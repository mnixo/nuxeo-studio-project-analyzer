const utils = require('./utils');

const credentials = utils.read('credentials.json');
const orgs = utils.read('orgs.json');

async function run() {
  for (let i = 0; i < orgs.length; i++) {
    const org = orgs[i];
    const url = `https://connect.nuxeo.com/nuxeo/site/nos/orgs/${org.orgId}/projects`;
    console.log(`[${i + 1}/${orgs.length}] Getting projects for ${org.orgId}...`);
    await utils.fetch(url, credentials, true, 1000).then(projects => org.projects = projects);
  }
  utils.store('projects.json', orgs);
}

run();
