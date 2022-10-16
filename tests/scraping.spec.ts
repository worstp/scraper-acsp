import { test, expect } from '@playwright/test';

const fs = require('fs');

let result: any = [];

let polosProperties = [
  'polo',
  'nivel',
  'conectividade',
  'equipamentosUrbanos',
  'acessibilidade',
  'ruaEdificio',
  'diversidade',
  'arquitetura',
  'usos',
  'conforto',
  'sensorial',
  'passeio',
  'segurancaFisica'
]

test("Getting all data from a table and passing into a JSON file", async ({ page }) => {
  //It will initialize in the login page and fill out fields with your informations
  await page.goto('https://acsp.herokuapp.com/users/sign_in');
  await page.locator('input[type=email]').type("PUT YOUR EMAIL HERE");
  await page.locator('input[type=password]').type("PUT YOUR PASSWORD HERE");
  
  let button = await page.locator('input[type=submit]');

  await button.click();

  await page.locator('a >> text=ranking').click({ button: 'left'});

  await page.waitForTimeout(5000);

  let links = await page.$$('tbody tr');

  for (let link of links) {
    let polos = {
      polo: String,
      nivel: String,
      conectividade: String,
      equipamentosUrbanos: String,
      acessibilidade: String,
      ruaEdificio: String,
      diversidade: String,
      arquitetura: String,
      usos: String,
      conforto: String,
      sensorial: String,
      passeio: String,
      segurancaFisica: String,
    };

    let ths = await link.$$('th');

    for(let i = 0;i<polosProperties.length;i++) {
      polos[polosProperties[i]] = String(await ths[i].textContent());
    };

    result.push(polos);
  };

  // It will create a file with all data that you have colected from the table
  fs.writeFileSync('result.json', JSON.stringify(result));
});
