# FileTemplater
Tool for creating file and/or directories based on custom or shared by other users templates.
[![NPM](https://nodei.co/npm/filetemplater.png)](https://nodei.co/npm/filetemplater/)

## FileTemplater is currently in development
It already working but it have many things to do.

## Installing
```
sudo npm install -g filetemplater
```

## Usage
```
filetemplater
```

## Where are my tempaltes?
```
~/.templates
```
## Templates structure
.templates
  TemplateName - any unique name
    info.json - template information
    tmpl - any files. files in this directory will be added to destination folder
    
## info.json structure
```
{
  "name": "Component Name",
  "description": "Some description",
  "params": [
    {
      "name": "Property name. It will be displayed in input field",
      "key": "name", // This key will be used in template files
      "help": "Some help text",
      "type": "text" // may be text or select
      "options": ["Option 1", "Option 2"] // if type is select here is options
    }
  ]
}
```
## Template data
Into your template all strings like {{name}} will be replaced with data from creating form. Also you can use naming object where will be all properties with other namings. ({{namings.name.<naming_name>}} (naming_name may be one of: camel, pascal, snake, kebab, caps) )
