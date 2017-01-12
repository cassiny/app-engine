# Project Structure

## Folder Structure
```
cassiny
|__ app-engine
    |__ dist
    |__ docs
    |__ src
```

### `src` Folder
The root folder of all source codes.

#### `src/client` Folder
The root folder of browser side source codes of ES6 scripts and assets.

#### `src/lib` Folder
The root folder of Node.js library in ES6, including business logic and utils.

#### `src/server` Folder
The root folder of Node.js web server in ES6, including routes, APIs and pages.

### `dist` Folder
The root folder of distribution including both server and browser side codes in
pure ES5, as well as related resources like CSS.
In the distributed version, there's no need for installing Babel, Webpack or
other devDependencies.

Use the following command to build the project:
```sh
npm run build
```

### `docs` Folder
Contains documents of this project.



## Branches
### `master` Branch
The latest stable or ready-to-release version.

### `development` Branch
The latest stable version under development.
