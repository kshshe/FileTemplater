const openExplorer = require("open-file-explorer");
const zipdir = require("zip-dir");
const path = require("path");

module.exports = (
  empty,
  callback = () => {
    return;
  }
) => {
  zipdir(
    templatesPath,
    {
      saveTo: path.resolve(exportPath, "export.zip")
    },
    function(err, buffer) {
      if (err) {
        console.error("Export error: ", err);
      } else {
        openExplorer(exportPath, err => {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  );
};
