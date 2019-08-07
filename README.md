# New Relic Apdex Board

Board displaying the most satisfying applications deployed on each host. Staisfactions is based on the apdex score of the indivdual applications.

## Getting started

This app was built with no development dependencies. I chose the tools which I'm most familiar with and were a good fit for the task.

### Tools

1. **Webpack** for bundling and ES6 style module loading
2. Webpack's **DevServer** for live reloading local server
2. **Yarn** for managing dependencies
3. JS with **Typescript** for a better development experience and probably an even better fit for OO projects
4. **SCSS** for styling
5. **Jest** for tests because of better Typescript support

### Compatibility

Built version is compatible with the latest 2 versions of **Chrome, Firefox, Safari, Opera**.

Typescript output is set to **`ES5`** so that should be sufficient for most older browsers. If you encounter issues in those, there are quick solutions to fix them by either using tool like **`Babel`** or load **polyfills** from **`core-js`**.

## View the project

To be able to view the project you need to point your web server to `public/index.html`. This folder contains the dist version of the project for easier testing.

### Test methods

All required methods are exposed via **`window`** object for easy access.

### `getTopAppsByHost`

Method returns the top 25 applications by host. Logs output back to the console. Example:

```
window.getTopAppsByHost('1d717554-bf17.sydnie.name')
```

*Possible improvements: cache top apps by host if this is a frequent call. Update the list after adding or removing apps.*

### `removeAppFromHosts`

Method removes an application from all hosts where it occurs. Pass the exact *name* of the application you want to remove. Example: 

```
window.removeAppFromHosts('Practical Metal Computer - Auer LLC, Inc')
```

### `addAppToHosts`

Method to add an application to any hosts. Example: 

```
window.addAppToHosts(
    {
        name: 'Test App Name - New Relic, Inc.',
        contributors: [],
        apdex: 98,
        version: 1,
        host: [
            '7e6272f7-098e.dakota.biz',
            '95b346a0-17f4.abbigail.name'
        ]
    }
)
```


## Development

Development is using Webpack's dev server. To run in development mode, run:

```
# with yarn
yarn

# with npm
npm install
```

Then run the following scripts:

```
# with yarn
yarn serve

# with npm
npm run serve
```

## Build for production

For production build run the following script:

```
# with yarn
yarn build

# with npm
npm run build
```

The production build files will be outputted to the `/public` folder. (Ideally these files are generated and static assets are copied from different sources.)

If you have `python` install (pre-installed on Mac OS) you could start up a server without the need change your existing setup, by running one of these scripts:

```
# with yarn
yarn host

#with npm
npm run host
```

## Tests

Basiv unit tests are provided for some methods as an example. Testing framework is Jest. Run unit tests:

```
# with yarn
yarn unit:test

# with npm
npm run unit:test
```

## Contact

If you have any questions feel free to contact me.
