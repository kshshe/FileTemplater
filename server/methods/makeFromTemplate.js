const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");
const recursive = require("recursive-readdir");

module.exports = (
  templateName,
  directionDir,
  params,
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
      console.log(info);
      console.log(templateFiles);

      recursive(templateFiles, function(err, files) {
        if (err) {
          console.error(err);
        } else {
          for (let key in files) {
            const file = files[key];
            const basename = path.basename(file);
            console.log({ basename });
            fs.readFile(file, "utf8", function(err, contents) {
              if (err) {
                console.error(err);
                callback(err);
              } else {
                fs.writeFile(
                  path.resolve(directionDirectory, basename),
                  contents,
                  function(err) {
                    if (err) {
                      callback(err);
                      console.error(err);
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
