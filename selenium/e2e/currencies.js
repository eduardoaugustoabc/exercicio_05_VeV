const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('currencies', function() {
  this.timeout(30000);
  let driver;
  
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:9990/admin');
    // await driver.get('http://150.165.75.99:9990/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  // Remove .only and implement others test cases!
  it('validate that cannot create the same currency twice', async () => {
    // Click in currencies in side menu
    await driver.findElement(By.linkText('Currencies')).click();

    // Click on create button
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button  primary "]'));
    await buttons[0].click();

    // Select Euro currency
    const dropdown = await driver.findElement(By.id('sylius_currency_code'));
    await dropdown.findElement(By.xpath("//option[. = 'Euro']")).click();

    // Click on create button
    const buttonToCreate = await driver.findElements(By.css('*[class^="ui labeled icon primary button"]'));
    await buttonToCreate[0].click();

    // Assert that cannot create the same currency twice
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
    assert(bodyText.includes('Currency code must be unique.'));
  });

  it('Test Off - Create Croatian Kuna', async () => {
    // Click in currencies in side menu
    await driver.findElement(By.linkText('Currencies')).click();

    // Click on create button
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button  primary "]'));
    await buttons[0].click();

    // Select Turkish Lira currency
    const dropdown = await driver.findElement(By.id('sylius_currency_code'));
    await dropdown.findElement(By.xpath("//option[. = 'Croatian Kuna']")).click();

    // Click on create button
    const buttonToCreate = await driver.findElements(By.css('*[class^="ui labeled icon primary button"]'));
    await buttonToCreate[0].click();

    // Get the body text to verify the result
    const bodyText = await driver.findElement(By.tagName('body')).getText();

    // Assert that the currency was successfully created
    assert(bodyText.includes('Currency has been successfully created.'));
  });

  it('Test Off - Create Iranian Rial', async () => {
    // Click in currencies in side menu
    await driver.findElement(By.linkText('Currencies')).click();

    // Click on create button
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button  primary "]'));
    await buttons[0].click();


    // Select Brazilian Real currency
    const dropdown = await driver.findElement(By.id('sylius_currency_code'));
    await dropdown.findElement(By.xpath("//option[. = 'Iranian Rial']")).click();


    // Click on create button
    const buttonToCreate = await driver.findElements(By.css('*[class^="ui labeled icon primary button"]'));
    await buttonToCreate[0].click();


    // Assert that cannot create the same currency twice
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Currency has been successfully created.'));
  });

  it('Test 1 - Create a conversion between two equal currencies (Dollar) - Error.', async () => {
    // Click in exchange rates in side menu
    await driver.findElement(By.linkText('Exchange rates')).click();


    // Click on create button
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button  primary "]'));
    await buttons[0].click();


    // Select US Dollar Source currency
    const dropdown = await driver.findElement(By.id('sylius_exchange_rate_sourceCurrency'));
    await dropdown.findElement(By.xpath("//option[. = 'US Dollar']")).click();


    // Type ratio to 5
    await driver.findElement(By.id('sylius_exchange_rate_ratio')).sendKeys('5');


    // Click on create button
    const buttonToCreate = await driver.findElements(By.css('*[class^="ui labeled icon primary button"]'));
    await buttonToCreate[0].click();


    // Assert that exchange rate has been created
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
  });


  it('Test 2 - Create a conversion between Dollar and Croatian Kuna', async () => {
    // Click in exchange rates in side menu
    await driver.findElement(By.linkText('Exchange rates')).click();


    // Click on create button
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button  primary "]'));
    await buttons[0].click();


    // Select US Dollar Source currency
    const dropdown = await driver.findElement(By.id('sylius_exchange_rate_sourceCurrency'));
    await dropdown.findElement(By.xpath("//option[. = 'US Dollar']")).click();


    // Select Croatian Kuna Target currency
    const dropdown_kuna = await driver.findElement(By.id('sylius_exchange_rate_targetCurrency'));
    await dropdown_kuna.findElement(By.xpath("//option[. = 'Croatian Kuna']")).click();


    // Type ratio to 5
    await driver.findElement(By.id('sylius_exchange_rate_ratio')).sendKeys('5');


    // Click on create button
    const buttonToCreate = await driver.findElements(By.css('*[class^="ui labeled icon primary button"]'));
    await buttonToCreate[0].click();


    // Assert that exchange rate has been created
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Exchange rate has been successfully created.'));
  });
});