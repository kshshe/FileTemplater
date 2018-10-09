const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");
const recursive = require("recursive-readdir");
const Handlebars = require("handlebars");
const shell = require("shelljs");
const naming = require("naming");

module.exports = (
  templateName,
  directionDir,
  params = {},
  callback = () => {
    return;
  }
) => {
  const templateDir = path.resolve(global.userRoot, ".templates", templateName);
  const templateInfo = path.resolve(templateDir, "info.json");
  const templateFiles = path.resolve(templateDir, "tmpl");
  const directionDirectory = path.resolve(global.fileRoot, directionDir);

  let namings = {};
  for (let key in params) {
    namings[key] = {
      camel: naming(params[key], "camel"),
      pascal: naming(params[key], "pascal"),
      snake: naming(params[key], "snake"),
      kebab: naming(params[key], "kebab"),
      caps: naming(params[key], "caps")
    };
  }
  params.namings = namings;

  console.log(params);

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
            const relativeName = path.relative(templateFiles, file);
            const newFileName = path.resolve(
              directionDir,
              Handlebars.compile(relativeName)(params)
            );
            shell.mkdir("-p", path.resolve(path.dirname(newFileName)));
            fs.readFile(file, "utf8", function(err, contents) {
              contents = Handlebars.compile(contents)(params);
              if (err) {
                console.error(err);
                callback(err);
              } else {
                fs.writeFile(path.resolve(newFileName), contents, function(
                  err
                ) {
                  filesProcessed++;
                  if (err) {
                    callback(err);
                    console.error(err);
                  }
                  if (filesProcessed === filesCount) {
                    callback({ directionDir });
                  }
                });
              }
            });
          }
        }
      });
    }
  });
};
