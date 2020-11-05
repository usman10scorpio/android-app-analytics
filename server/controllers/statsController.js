var fs = require("fs");
const { appsMeta } = require("../utils/appsMeta");

module.exports = (app) => {
  app.get("/api/stats", async (req, res) => {
    let stats = [];
    let appStat = [];
    let appNames = [];

    // check downloads folder exist

    if (fs.existsSync("./downloads")) {
      // check if all apps folder exist

      for (let index = 0; index < appsMeta.length; index++) {
        let path = "./downloads/" + appsMeta[index].name;

        appNames.push(appsMeta[index].name);

        // check if app folder exist and not empty
        if (fs.existsSync(path) && fs.readdirSync(path).length > 0) {
          appStat = [["Daily", "Downloads"]];

          fs.readdirSync(path).forEach((file) => {
            const content = JSON.parse(
              fs.readFileSync(path + "/" + file, "utf-8")
            );

            const data = [content.currentDate, content.maxInstalls];

            appStat.push(data);
          });
        }

        stats.push(appStat);
      }
    }

    res.status(200).send({ stats, appNames });
  });
};
