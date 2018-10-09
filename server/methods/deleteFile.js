const fs = require("fs");
const path = require("path");

module.exports = (
  file,
  callback = () => {
    return;
  }
) => {
  if (file) fs.unlink(file, () => {});
  callback({
    directionDir: path.relative("./", path.dirname(file))
  });
};
