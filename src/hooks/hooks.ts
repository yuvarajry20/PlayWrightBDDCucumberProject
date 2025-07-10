import { createLogger } from 'winston';
import { Browser, BrowserContext, chromium } from 'playwright';
import { After, AfterAll, Before, BeforeAll,Status } from '@cucumber/cucumber';
import { pageFixture } from './pagefixture';
import { getEnv } from '../helper/env/env';
import { invokeBrowser } from '../helper/Browser/browsermanager';
import { create } from 'domain';
import { options } from '../helper/utility/logger';
import { Timer } from '../helper/utility/timer'; // adjust path if necessary



let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
  Timer.setStartTime(); 
});
Before(async function ({ pickle }) {
  const scenarioName= pickle.name + pickle.id
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.logger= createLogger(options(scenarioName));
  pageFixture.page = page;
});
After(async function ({pickle, result}) {
    console.log(result?.status);
    if (result?.status == Status.FAILED) {
        const img= await pageFixture.page?.screenshot({path: `./test-results/screenshots/${pickle.name}.png`,type: 'png'})
        if (img) {
      await this.attach(img, 'image/png');
    }
    await pageFixture.page?.close();
    await context.close();
    }
});
AfterAll(async function () {
  await browser.close();
  await pageFixture.logger?.close();
});
