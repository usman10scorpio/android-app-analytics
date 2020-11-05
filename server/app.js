const http = require("http");
const gplay = require("google-play-scraper");
const { appsMeta } = require("./utils/appsMeta");

var fs = require("fs");
var date = new Date();

const currentDate =
  date.getDate() + "-" + date.getMonth() + 1 + "-" + date.getFullYear();

let res = "";

const getStats = async () => {
  // Only create download folder for first time
  if (!fs.existsSync("./downloads")) {
    fs.mkdirSync("./downloads/");
  }

  for (let index = 0; index < appsMeta.length; index++) {
    //  Create folders inside downloads folder exist

    if (!fs.existsSync("./downloads/" + appsMeta[index].name)) {
      fs.mkdirSync("./downloads/" + appsMeta[index].name);
    }

    // create relevant files to each folder
    if (
      !fs.existsSync(
        `./downloads/${appsMeta[index].name}/` + currentDate + ".json"
      )
    ) {
      //file does not exists
      const stats = await gplay.app({ appId: appsMeta[index].appId });
      console.log("--------------Statss----------------------");
      console.log(stats);
      console.log("------------------------------------");

      res = JSON.stringify({ currentDate, ...stats });

      fs.writeFile(
        `./downloads/${appsMeta[index].name}/` + currentDate + ".json",
        res,
        function (err) {
          if (err) {
            console.log(err);
            console.log("--------------Error----------------------");
            console.log(`Write operation failed for ${appsMeta[index].name}`);
            console.log("------------------------------------");
          } else {
            console.log("------------------------------------");
            console.log(
              `Write operation completed for ${appsMeta[index].name}`
            );
            console.log("------------------------------------");
          }
        }
      );
    }
  }
};

let handleRequest = (request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  response.write(`AppId : ${appId}  ${res} `);

  response.end();
};

http.createServer(handleRequest).listen(8000);

getStats();
