const fs = require("fs");
const path = require("path");

const ignore = ["node_modules"];

module.exports = (
  dir = global.fileRoot,
  callback = () => {
    return;
  }
) => {
  const resolvedDir = path.resolve(dir);
  fs.readdir(resolvedDir, (err, files) => {
    if (err) {
      callback({
        path: dir,
        files: []
      });
    } else {
      let result = {};
      for (let key in files) {
        if (!ignore.includes(files[key]) && files[key][0] !== ".") {
          result[files[key]] = {
            name: files[key],
            absolute: path.resolve(resolvedDir, files[key]),
            dir: fs
              .lstatSync(path.resolve(resolvedDir, files[key]))
              .isDirectory()
          };
        }
      }
      callback({
        path: dir,
        files: result
      });
    }
  });
};
