const fs = require("fs");
const path = require("path");

const ignore = ["node_modules"];

module.exports = (
  callback = () => {
    return;
  }
) => {
  const resolvedDir = path.resolve("./", "templates");
  fs.readdir(resolvedDir, (err, files) => {
    if (err) {
      callback([]);
    } else {
      let result = [];
      for (let key in files) {
        const basename = path.basename(files[key]);
        result.push(basename);
      }
      callback(result);
    }
  });
};
