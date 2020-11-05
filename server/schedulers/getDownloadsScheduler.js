const schedule = require("node-schedule");
const gplay = require("google-play-scraper");
const { appsMeta } = require("../utils/appsMeta");

var fs = require("fs");
var date = new Date();

const currentDate =
  date.getDate() +
  "-" +
  ("0" + (date.getMonth() + 1)).slice(-2) +
  "-" +
  date.getFullYear();

const sendItemCronTime = "0 0 0 * * *"; // runs at midnight

let res = "";

const downloadsPath = "./downloads";

schedule.scheduleJob(
  "download stats for all apps",
  sendItemCronTime,
  async () => {
    try {
      createFolder(downloadsPath);

      for (let index = 0; index < appsMeta.length; index++) {
        let folderPath = "./downloads/" + appsMeta[index].name;

        //  Create folders inside downloads folder
        createFolder(folderPath);

        await getStats(appsMeta, index);
      }
    } catch (error) {
      console.log(`error in get downloads scheduler ${error}`);
    }
  }
);

const createFolder = (path) => {
  // Only create download or subfolder folder for first time synchronously
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const getStats = async (appsMeta, index) => {
  let filePath = `./downloads/${appsMeta[index].name}/` + currentDate + ".json";

  const stats = await gplay.app({ appId: appsMeta[index].appId });

  res = JSON.stringify({ currentDate, ...stats });

  fs.writeFile(filePath, res, function (err) {
    if (err) {
      console.log(
        `Write operation failed for ${appsMeta[index].name} and error is ${err}`
      );
    } else {
      console.log(`Write operation completed for ${appsMeta[index].name}`);
    }
  });
};
