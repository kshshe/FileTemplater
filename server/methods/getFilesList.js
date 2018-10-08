const fs = require("fs");
const path = require("path");

module.exports = (
  dir = "./",
  callback = () => {
    return;
  }
) => {
  dir = path.resolve(dir);
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(err);
      throw err;
    }
    files = files.map(file => {
      return {
        name: file,
        dir: fs.lstatSync(file).isDirectory()
      };
    });
    callback(files);
  });
};
