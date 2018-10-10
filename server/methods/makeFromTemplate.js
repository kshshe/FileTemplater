const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");
const recursive = require("recursive-readdir");
const Handlebars = require("handlebars");
const shell = require("shelljs");
const naming = require("naming");
const regex = /#each-([^#_]*)(_([^#]*))?#/m;

Handlebars.registerHelper("camelCase", function(text) {
  return naming(text, "camel");
});

Handlebars.registerHelper("PascalCase", function(text) {
  return naming(text, "pascal");
});

Handlebars.registerHelper("snake_case", function(text) {
  return naming(text, "snake");
});

Handlebars.registerHelper("kebab-case", function(text) {
  return naming(text, "kebab");
});

Handlebars.registerHelper("CAPS", function(text) {
  return naming(text, "caps");
});

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

  fs.readFile(templateInfo, "utf8", function(err, contents) {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      const info = JSON5.parse(contents);
      for (let key in info.params) {
        if (info.params[key].type === "list") {
          if (params[info.params[key].key]) {
            params[info.params[key].key] = params[info.params[key].key]
              .split(",")
              .map(item => item.toString().trim())
              .filter(item => item !== "");
          }
        }
      }

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
            fs.readFile(file, "utf8", function(err, contents) {
              contents = Handlebars.compile(contents)(params);
              if (err) {
                console.error(err);
                callback(err);
              } else {
                const newFileName = path.resolve(
                  directionDir,
                  Handlebars.compile(relativeName)(params)
                );

                let newFileNames = [newFileName];

                let done = false;
                let fileKey = 0;
                while (!done) {
                  const currentFileName = newFileNames[fileKey];
                  if (currentFileName) {
                    if ((m = regex.exec(currentFileName)) !== null) {
                      const key = m[1];
                      const keyNamingBlock = m[2] || "";
                      const keyNaming = m[3];
                      if (params[key]) {
                        if (typeof params[key] === "string") {
                          let newValue = "";
                          if (keyNaming) {
                            newValue = naming(params[key], keyNaming);
                          } else {
                            newValue = params[key];
                          }
                          newFileNames[fileKey] = currentFileName
                            .split(`#each-${key}${keyNamingBlock}#`)
                            .join(newValue);
                        } else {
                          newFileNames.splice(fileKey, 1);
                          for (let listKey in params[key]) {
                            let newValue = "";
                            if (keyNaming) {
                              newValue = naming(
                                params[key][listKey],
                                keyNaming
                              );
                            } else {
                              newValue = params[key][listKey];
                            }
                            let newName = currentFileName.replace(
                              `#each-${key}${keyNamingBlock}#`,
                              newValue
                            );
                            newFileNames.push(newName);
                          }
                          fileKey = 0;
                        }
                      }
                    } else {
                      fileKey++;
                      if (newFileNames.length <= fileKey) {
                        done = true;
                      }
                    }
                  } else {
                    done = true;
                  }
                }

                const fileNamesCount = newFileNames.length;
                let fileNamesProcessed = 0;

                for (let key in newFileNames) {
                  let newFileName = newFileNames[key];

                  shell.mkdir("-p", path.resolve(path.dirname(newFileName)));
                  fs.writeFile(path.resolve(newFileName), contents, function(
                    err
                  ) {
                    fileNamesProcessed++;
                    if (fileNamesProcessed === fileNamesCount) {
                      filesProcessed++;
                    }
                    if (err) {
                      callback(err);
                      console.error(err);
                    }
                    if (filesProcessed === filesCount) {
                      callback({ directionDir });
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  });
};
