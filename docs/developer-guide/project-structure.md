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
Browser side source codes of ES6 scripts and assets.
#### `src/lib` Folder
Node.js library in ES6, including business logic and utils.
#### `src/server` Folder
Node.js web server in ES6, including routes, APIs and pages.


### `dist` Folder
Distributed codes and assets of both server and browser sides.
#### `dist/assets`
Distributed ES5 codes and assets of browser side. The assets should be run as a
cookie-less static web server or uploaded to CDN server.
#### `dist/lib`
Distributed ES5 codes of Node.js library.
#### `dist/server`
Distributed ES5 codes of Node.js web server.


### `docs` Folder
Contains documents of this project.




## Branches
### `master` Branch
The latest stable or ready-to-release version.

### `development` Branch
The latest stable version under development.
