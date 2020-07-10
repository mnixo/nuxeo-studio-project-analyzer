const utils = require('./utils');

const credentials = utils.read('credentials.json');
const username = credentials.username;
const orgs = utils.read('branches.json');

async function run() {
  for (let i = 0; i < orgs.length; i++) {
    const org = orgs[i];
    const projects = org.projects;
    console.log(`[${i + 1}/${orgs.length}] Getting appDef info for ${org.orgId}...`);
    for (let j = 0; j < projects.length; j++) {
      const project = projects[j];
      const projectId = project.projectId;
      const branches = project.branches
      console.log(`  [${j + 1}/${projects.length}] Getting appDef info for ${org.orgId}/${projectId}...`);
      for (let k = 0; k < branches.length; k++) {
        const branch = branches[k];
        const branchId = branch.id;
        const url = `https://connect.nuxeo.com/nuxeo/site/nos-studio/users/${username}/projects/${projectId}/branches/${branchId}/appDef`;
        console.log(`    [${k + 1}/${branches.length}] Getting appDef info for ${org.orgId}/${projectId}/${branchId}...`);
        await utils.fetch(url, credentials, true, 1000).then(appDef => branch.appDef = appDef).catch(() => branch.appDef = null);
      }
    }
  }
  utils.store('appDef.json', orgs);
}

run();
