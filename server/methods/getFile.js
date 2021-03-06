const fs = require("fs");
const path = require("path");

module.exports = (
  file,
  callback = () => {
    return;
  }
) => {
  if (file) {
    fs.readFile(path.resolve(global.fileRoot, file), "utf8", function(
      err,
      contents
    ) {
      callback({
        filename: file,
        contents
      });
    });
  }
};
