const { Builder, By} = require("selenium-webdriver");
const fs = require("fs");
(async function start() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get(`https://bus.mapbar.com/shenyang/xianlu/`);
  driver.sleep(1000);

  let items = await driver.findElements(By.css("body .content .ChinaTxt dd a"));
  console.log(items.length);
  console.log(items[0]);
  let hrefList = [];
  for (let item of items) {
    let href = await item.getAttribute("href");
    let title = await item.getAttribute("title");
    hrefList.push({
      href,
      lineName: title
    });
  }
  let resultList = [];
  for (let item of hrefList) {
    await driver.get(item.href);
    let lines = await driver.findElements(By.css(".poi-box .buslist ul li a"));
    let busStop = [];
    for (let line of lines) {
      let lineName = await line.getAttribute("title");
      busStop.push(lineName);
    }
    let res = {
      busStop: busStop,
      ...item
    };
    resultList.push(res);
  }

  var str = JSON.stringify(resultList);
  fs.writeFile("./busStop.json", str, function(err, data) {
    if (err) {
      console.error(err);
    }
    console.log("json写入成功");
  });
})();
