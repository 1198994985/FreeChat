const { Builder, By, Key } = require("selenium-webdriver");
const rankInfo = require("./models/rank.js");
const { Options } = require("selenium-webdriver/chrome");

// //每个榜单的id
//  let  ids = ['19723756', '3779629', '2884035', '3778678', '991319590',
//            '2408901803', '1978921795', '71385702', '2462790889',
//            '10520166', '3812895', '60131', '71384707', '180106', '60198',
//            '27135204', '11641012', '120001', '2323534945', '745956260',
//            '2023401535', '2006508653', '21845217', '112463',
//            '112504', '64016', '10169002', '1899724']
//每个榜单的id
let ids = [ '10520166', '3812895', '60131', '71384707', '180106', '60198',
            '27135204', '11641012', '120001', '2323534945', '745956260',
            '2023401535', '2006508653', '21845217', '112463',
           '112504', '64016', '10169002', '1899724'];
// 每个榜单的名称
let names = [
  "云音乐飙升榜",
  "云音乐新歌榜",
  "网易原创歌曲榜",
  "云音乐热歌榜",
  "江小白YOLO云音乐说唱榜",
  "公告牌音乐榜",
  "云音乐电音榜",
  "云音乐电音榜",
  "云音乐ACG音乐榜",
  "YY音乐榜",
  "云音乐国电榜",
  "云音乐国电榜",
  "云音乐国电榜",
  "云音乐古典音乐榜",
  "UK排行榜周榜",
  "美国Billboard周榜",
  "法国 NRJVos Hits 周榜",
  "iTunes榜",
  "Hit FMTop榜",
  "说唱TOP榜",
  "云音乐韩语榜",
  "英国Q杂志中文版周榜",
  "电竞音乐榜",
  "KTV唛榜",
  "台湾Hito排行榜",
  "中国TOP排行榜（港台榜）",
  "中国TOP排行榜（内地榜）",
  "香港r台中文歌曲龙虎榜",
  "中国嘻哈榜"
];
let result = [];
for (let rankId in ids) {
  (async function start() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(
      `https://music.163.com/discover/toplist?id=${ids[rankId]}`
    );
    driver.sleep(1000);
    await driver.switchTo().frame(driver.findElement(By.id("g_iframe")));
    let items = await driver.findElements(By.css("body tbody tr"));

    items &&
      items.forEach(async (item, index) => {
        // 获取岗位名称
        // let title = await item.findElement(By.css('.p_top h3')).getText()
        // musicurl
         try {
        let musicURL = await item.findElement(By.css(".tt a"));
        let name = await item.findElement(By.css(".tt  .ttc .txt a b"));
        let during = await item.findElement(By.css(".u-dur"));
        let author = await item.findElement(By.css("td .text"));
        let authorId = await item.findElement(By.css("td .text a"));
        // https://music.163.com/song/media/outer/url?id=id.mp3
        musicURL = await musicURL.getAttribute("href");
        name = await name.getAttribute("title");
        during = await during.getText();
        author = await author.getAttribute("title");
        authorId = await authorId.getAttribute("href");
        let musicId = musicURL.split("=")[1];
        let res = {
          rankIndex: index,
          musicURL: getMusicUrl(musicId),
          musicName: name,
          during,
          author,
          authorId: authorId.split("=")[1],
          rankId: ids[rankId]
        };
        // rankInfo.insertRankItem(res);
        // result.push(res);
           console.table(res)
         } catch {}
      });
  })();
}

function getMusicUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

