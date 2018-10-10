# FileTemplater

Tool for creating file and/or directories based on custom or shared by other users templates.
[![NPM](https://nodei.co/npm/filetemplater.png)](https://nodei.co/npm/filetemplater/)

## FileTemplater is currently in development

It already working but it have many things to do.

### TODO:

- Code testing
- Template manager in web interface
- Lists in input types
- Sharing templates
- Better interface

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

```
.templates
  TemplateName - any unique name
    info.json - template information
    tmpl - any files. files in this directory will be added to destination folder
```

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

All data in files into tmpl directory parsed by [handlebars](https://www.npmjs.com/package/handlebars) package.

## Example

### Data

```
{
    name: "FooBar",
    select: "OptionThatISelect",
    list: [
        "ListItem1",
        "listItem2",
        "list-item-three"
    ]
}
```

### Template

```
Raw data:
Name: {{name}}
Select: {{select}}
List: {{#each list}}
    {{@index}}: {{this}}
{{/each}}

With helpers:
camelCaseName: {{camelCase name}}
PascalCaseSelect: {{PascalCase select}}
snake_case_name: {{snake_case name}}
kebab-case-select: {{kebab-case select}}
caps-list: {{#each list}}
    {{CAPS this}}
{{/each}}
```

### Output

```

```
