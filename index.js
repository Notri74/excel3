const https = require("https");
const fs = require("fs");

let urls = [];
let myArray = [];
let urlWeb =
  "https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting";

async function main() {
  https.get(urlWeb, function (res) {
    var data = "";
    res.on("data", function (d) {
      data += d;
      //   console.log(data);
    });
    res.on("end", async function () {
      // myArray = data.match(/<ul class="gem-c-document-list">.*?<\/ul>/g);
      // console.log(myArray);

      myArray = data
        .split('<ul class="gem-c-document-list">')[1]
        .split("</div>")[0];

      console.log(myArray);

      for (let i = 0; i < myArray.length; i++) {}
    });

    res.on("error", function (e) {
      console.error(e);
    });
  });
}

main();
