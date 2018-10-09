const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");
const recursive = require("recursive-readdir");
const Handlebars = require("handlebars");

module.exports = (
  templateName,
  directionDir,
  params = {},
  callback = () => {
    return;
  }
) => {
  const templateDir = path.resolve("./", "templates", templateName);
  const templateInfo = path.resolve(templateDir, "info.json");
  const templateFiles = path.resolve(templateDir, "tmpl");
  const directionDirectory = path.resolve("./", directionDir);

  fs.readFile(templateInfo, "utf8", function(err, contents) {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      const info = JSON5.parse(contents);

      recursive(templateFiles, function(err, files) {
        if (err) {
          console.error(err);
        } else {
          let filesCount = files.length;
          let filesProcessed = 0;
          for (let key in files) {
            const file = files[key];
            const basename = path.basename(file);
            fs.readFile(file, "utf8", function(err, contents) {
              contents = Handlebars.compile(contents)(params);
              if (err) {
                console.error(err);
                callback(err);
              } else {
                fs.writeFile(
                  path.resolve(directionDirectory, basename),
                  contents,
                  function(err) {
                    filesProcessed++;
                    if (err) {
                      callback(err);
                      console.error(err);
                    }
                    if (filesProcessed === filesCount) {
                      callback({ directionDir });
                    }
                  }
                );
              }
            });
          }
        }
      });
    }
  });
};
