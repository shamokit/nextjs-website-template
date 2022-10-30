# Next.js Website Template


## Getting Started

## CSS

### PostCSS Plugin

See the files below.

- [postcss.config.js](./postcss.config.js)

## Fetch Libraries

### API

I am using [aspida](https://github.com/aspida/aspida).  
See src/api.

Please match this with the structure of the API endpoint.

The `npm run api:build` command will generate a $api.ts file in this folder.  
[aspida.config.js](./aspida.config.js)

### CSR



## Rule(WIP)

See the files below.

- [.eslintrc.js](./.eslintrc.js)
- [.stylelintrc.json](./.stylelintrc.json)

## Format

See the files below.

- [.editorconfig](./.editorconfig)
- [.prettierrc.json](./.prettierrc.json)

### Attention

(Probably) When tabs are used on windows, aspida formatting goes wrong, so useTabs is set to false only under src/api.

## Alias

See the files below.

- [.tsconfig.json](./.tsconfig.json)

| alias | path |
| --- | --- |
| @/public | public |
| @/api | src/api |
| @/components | src/components |
| @/libs | src/libs |
| @/pages | src/pages |
| @/styles | src/styles |
| @/utils | src/utils |
