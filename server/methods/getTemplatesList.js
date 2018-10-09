const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");

module.exports = (
  margin,
  callback = () => {
    return;
  }
) => {
  const resolvedDir = path.resolve(global.fileRoot, "templates");
  fs.readdir(resolvedDir, (err, files) => {
    let result = [];
    if (err) {
      callback(result);
    } else {
      let filesCount = files.length;
      let filesProcessed = 0;
      for (let key in files) {
        const basename = path.basename(files[key]);

        fs.readFile(
          path.resolve(global.fileRoot, "templates", basename, "info.json"),
          "utf8",
          function(err, contents) {
            filesProcessed++;
            if (!err) {
              const info = JSON5.parse(contents);
              result.push({
                basename,
                info
              });
              if (filesProcessed === filesCount) {
                callback(result);
              }
            }
          }
        );
      }
    }
  });
};
