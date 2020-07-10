const utils = require('./utils');

const credentials = utils.read('credentials.json');
const username = credentials.username;
const orgs = utils.read('projects.json');

async function run() {
  for (let i = 0; i < orgs.length; i++) {
    const org = orgs[i];
    const projects = org.projects;
    console.log(`[${i + 1}/${orgs.length}] Getting branches for ${org.orgId}...`);
    for (let j = 0; j < projects.length; j++) {
      const project = projects[j];
      const projectId = project.projectId;
      const url = `https://connect.nuxeo.com/nuxeo/site/nos-studio/users/${username}/projects/${projectId}/branches`;
      console.log(`  [${j + 1}/${projects.length}] Getting branches for ${org.orgId}/${projectId}...`);
      await utils.fetch(url, credentials, true, 1000).then(branches => project.branches = branches);
    }
  }
  utils.store('branches.json', orgs);
}

run();
