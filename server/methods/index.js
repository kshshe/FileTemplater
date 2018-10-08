const getFilesList = require("./getFilesList");
const deleteFile = require("./deleteFile");
const makeFromTemplate = require("./makeFromTemplate");
const getTemplatesList = require("./getTemplatesList");

module.exports = {
  get_files_list: getFilesList,
  delete_file: deleteFile,
  make_from_template: makeFromTemplate,
  get_templates_list: getTemplatesList
};
