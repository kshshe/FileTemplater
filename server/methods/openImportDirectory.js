const openExplorer = require("open-file-explorer");
module.exports = (
  empty,
  callback = () => {
    return;
  }
) => {
  openExplorer(importPath, err => {
    if (err) {
      console.error(err);
    }
  });
};
