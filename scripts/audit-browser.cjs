// Audit harness. Uses an isolated browser, never a personal profile.
const {chromium} = require(require('node:path').join(require('node:os').tmpdir(), 'oberemchuk-audit-tools/node_modules/playwright'));
const fs = require('node:fs');
const assert = require('node:assert/strict');

(async () => {
  fs.mkdirSync('docs/site-audit', {recursive:true});
  const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const results=[];
  for(const [label,base,width,paths] of [
    ['live','https://oberemchuk.online',1440,['/','/services']],
    ['local','http://localhost:3100',1440,['/','/services']],
    ['mobile','http://localhost:3100',390,['/','/services','/estimate','/portfolio']],
  ]) {
    const context=await browser.newContext({viewport:{width,height:900},locale:'uk-UA',deviceScaleFactor:1});
    for(const path of paths) {
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      await page.addInitScript(()=>{
        window.auditTasks=[];
        new PerformanceObserver(list=>window.auditTasks.push(...list.getEntries().map(e=>e.duration))).observe({type:'longtask',buffered:true});
      });
      const response=await page.goto(base+path,{waitUntil:'networkidle',timeout:45000});
      await page.evaluate(()=>document.fonts.ready);
      const metrics=await page.evaluate(()=>{
        const elements=[...document.querySelectorAll('body *')];
        return {
          title:document.title,h1:document.querySelector('h1')?.innerText,
          elements:elements.length,height:document.body.scrollHeight,
          horizontalOverflow:document.documentElement.scrollWidth>innerWidth,
          animations:document.getAnimations().filter(a=>a.playState==='running').length,
          backdrops:elements.filter(e=>getComputedStyle(e).backdropFilter!=='none').length,
          promoted:elements.filter(e=>getComputedStyle(e).willChange!=='auto').length,
          scripts:performance.getEntriesByType('resource').filter(r=>r.initiatorType==='script').length,
          longTasks:window.auditTasks.length,longTaskMs:Math.round(window.auditTasks.reduce((a,b)=>a+b,0)),
        };
      });
      const name=label+'-'+(path==='/'?'home':path.slice(1));
      const reject=page.getByRole('button',{name:'Відхилити',exact:true});
      if(label!=='live' && await reject.isVisible()) await reject.click();
      await page.screenshot({path:'docs/site-audit/'+name+'.png',fullPage:false});
      if(label!=='live') {
        assert.equal(response.status(),200,name);
        assert.equal(metrics.horizontalOverflow,false,name+' horizontal overflow');
        assert.deepEqual(errors,[],name+' browser errors');
      }
      console.log(JSON.stringify({name,...metrics,errors}));
      results.push({name,...metrics,errors});
      if(label==='mobile' && path==='/') {
        await page.getByRole('button',{name:'Меню',exact:true}).click();
        await page.getByRole('dialog').waitFor({state:'visible'});
        assert.equal(await page.getByRole('dialog').isVisible(),true);
        await page.getByRole('dialog').getByRole('link',{name:'Контакти',exact:true}).click();
        await page.waitForURL('**/#contact');
        await page.locator('input[name="name"]').fill('Перевірка форми');
        assert.equal(await page.locator('input[name="name"]').inputValue(),'Перевірка форми');
        console.log('Mobile menu, contact anchor and form input passed (no submission).');
      }
      if(label==='mobile' && path==='/estimate') {
        await page.locator('select').first().selectOption({label:'Landing page'});
        assert.ok(await page.locator('input[name="projectType"]').inputValue());
        console.log('Estimate selector passed (no submission).');
      }
      await page.close();
    }
    await context.close();
  }
  const noJS=await browser.newContext({javaScriptEnabled:false});
  const page=await noJS.newPage();
  await page.goto('http://localhost:3100/');
  assert.equal(await page.locator('h1').innerText(),'Створення\nсайтів під ключ\nдля бізнесу');
  assert.equal(await page.locator('#services').isVisible(),true);
  assert.equal(await page.locator('#contact').isVisible(),true);
  const interactive=await browser.newContext({viewport:{width:1440,height:900},locale:'uk-UA'});
  const navigation=await interactive.newPage();
  await navigation.goto('http://localhost:3100/',{waitUntil:'networkidle'});
  await navigation.getByRole('button',{name:'Відхилити',exact:true}).click();
  await navigation.getByRole('button',{name:'Мова',exact:true}).click();
  await navigation.getByRole('option').filter({hasText:'English'}).click();
  await navigation.waitForURL('**/en');
  assert.equal(await navigation.locator('html').getAttribute('lang'),'en');
  await navigation.goto('http://localhost:3100/portfolio',{waitUntil:'networkidle'});
  const previousTitle=await navigation.locator('section h3').first().innerText();
  await navigation.getByRole('button',{name:'Наступний проєкт',exact:true}).click();
  await navigation.waitForFunction(previous=>document.querySelector('section h3')?.textContent!==previous,previousTitle);
  console.log('Language switching and portfolio slide interaction passed.');
  await browser.close();
  fs.writeFileSync('docs/site-audit/browser-results.json',JSON.stringify(results,null,2)+'\n');
  console.log('Browser layout, rendering, translation and no-JavaScript checks passed.');
})().catch(error=>{console.error(error);process.exit(1)});
