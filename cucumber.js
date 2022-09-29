let common = [
//'--require e2e/playwright/suites/Suite01-ManageForms/steps/manageForms.step.ts', // Load Manage-Forms step definitions
  //  '--require e2e/playwright/suites/suite08-CategoryManager/steps/*.ts',
   '--require e2e/playwright/suites/suite07-QualityPlan/steps/*.ts',
  //'--require e2e/playwright/suites/suite08-CategoryManager/steps/*.ts',
  '--require e2e/pageObjects/*.ts',                                  //Load all PageObject files  
  '--require e2e/common/*.ts',                                        // support files
  '--require-module ts-node/register',                                // Load TypeScript module
  //`--format-options '{"snippetInterface": "synchronous"}' -f ./e2e/reportPortalFormatter.js`
].join(' ');

module.exports = {
  default: common
};
