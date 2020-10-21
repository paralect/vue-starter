# Vue starter

[![Stack](https://raw.githubusercontent.com/paralect/stack/master/stack-component-template/stack.png)](https://github.com/paralect/stack)

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![David Dependancy Status](https://david-dm.org/paralect/koa-react-starter.svg)](https://david-dm.org/paralect/vue-starter)

[![Watch on GitHub](https://img.shields.io/github/watchers/paralect/koa-react-starter.svg?style=social&label=Watch)](https://github.com/paralect/vue-starter/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/paralect/koa-react-starter.svg?style=social&label=Stars)](https://github.com/paralect/vue-starter/stargazers)
[![Follow](https://img.shields.io/twitter/follow/paralect.svg?style=social&label=Follow)](https://twitter.com/paralect)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/paralect/koa-react-starter.svg?style=social)](https://twitter.com/intent/tweet?text=I%27m%20using%20Stack%20components%20to%20build%20my%20next%20product%20🚀.%20Check%20it%20out:%20https://github.com/paralect/stack)

Vue starter is what we think an ideal starting point for the most Vue.js frontend applications. It is based on the following primary technologies:

- vue
- vue-router
- vuex
- postcss
- eslint

Application structured in a way, which we find most efficient in both short and long term projects. The main intention of the current structure is to keep logical components close to each other and define clear structure for the common things, such as routers, store, api wrappers, reducers, action creators, store selectors.

### Explanations of the files structure.

1. **[src/components](./src/components)** - this folder consists of all common UI components.
2. **[src/pages](./src/pages)** - this folder consists of all UI components that represents pages of your application. Every such component should have all files related to the page: images, vue files, sub components.
3. **[src/layouts](./src/layout)** - represent a layout of your application and should consist all layout related logic and other components, such as headers, footers, sidebars.
4. **[src/router](./src/router)** - includes router for your application.
3. **[src/helpers](./src/helpers)** - this folder should consist of common helpers used in other components, such as date formatters, api wrappers, validation functions, common functions and all other files that does not fit current structure. If you don't know where to put certain file - put it into this folder and we will eventually figure out the right place for it.
4. **[src/resources](./src/resources/user)** - a folder consist of all vuex/api related things. Typically resource maps 1 to 1 to the api endpoint, but not limited to only api endpoints. Every resource is responsible for management certain part of the redux store. If you need keep something client specific in the vuex store, you can create separate resource for it. For example: navigation resource may contain some history of the all opened pages without 1 to 1 connection to the rest api. Main moving parts of resource:
    - **[src/resources/store.js](./src/resources/store.js)** - creation logic for the vuex store.
    - **[src/resources/\*/\*.actions.js](./src/resources/user/user.actions.js)** - vuex actions for the given resource.
    - **[src/resources/\*/\*.api.js](./src/resources/user/user.api.js)** - all api methods of the given resource. Optional.
    - **[src/resources/\*/\*.state.js](./src/resources/user/user.state.js)** - vuex state for the given resource.
    - **[src/resources/\*/\*.mutations.js](./src/resources/user/user.mutations.js)** - mutations for the given resource.
    - **[src/resource/\*/\*.getters.js](./src/resources/user/user.getters.js)** - selectors for the given resource. You should never access store directly, but always use getters instead. That would simplify things when structure of the store data changes.
    - **[src/resources/\*/\*.module.js](./src/resources/user/user.module.js)** - vuex module for the given resource.
5. **[src/services](./src/services)** - folder should consist of the logic for the the third party service integrations (such as Intercom, Segment, etc). Not limited only to the third party services, but could consist some standalone application related services.

### Important things to keep in mind

1. Logical components should be tightly coupled. Keep all component related files, such as images, styles, sub components as close as possible to the component. Do not put component into the `common` folder for the *future use*.
2. Two separate page components should be loosely coupled. If there is two page components which use same image - keep two copies of every image within every page. Do not create generic images folder, as all images belong to some ui components.

### Conventions

1. Name of all files for components should start from lowercase letter and words should be separated by a dash (`date-range`, `multi-action-button`).
2. Code style (eslint).

## License

Koa react starter is released under the [MIT License](LICENSE).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

Join us and share something developers need 👌.