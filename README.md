# pingal-simulator

> A Vue.js project

Desktop and Web app to test the backend (especially, the pingal_brain). 
This is a port of core components in pingal_chat (react-native).  
 
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

Vue.js is like React, has a much lower learning curve, and is fun. Helpful references:
- [official guide](https://vuejs.org/v2/guide/) 
- [this tutorial](https://coligo.io/learn-vuex-by-building-notes-app/).
- [a simple app](http://vue.tigerb.cn/#/)

From React (or any component framework) to Vue in 1 hour. Least amount of information needed to be productive:
- [templates (component render)](https://vuejs.org/v2/guide/syntax.html) : Standard Html tags (No JSX). [v-if directive (Conditional toggling of template)](https://vuejs.org/v2/guide/conditional.html). [Lists use v-for](https://vuejs.org/v2/guide/list.html)
- Themes and Styling: [Vue-Material](https://vuematerial.github.io/#/) components are used for Material theme  
- [Vue Devtools](https://laracasts.com/series/learn-vue-2-step-by-step/episodes/2)

- Passing data from parent to child components (props): [props](https://vuejs.org/v2/guide/components.html#Passing-Data-with-Props)
- Maintaining data inside component (data): [data must be a function](https://vuejs.org/v2/guide/components.html#What-are-Components) ; 
- Binding data inside component:  [v-model and v-bind for input binding] (https://vuejs.org/v2/guide/forms.html)
- Sharing data to external components (store): [veux](https://vuex.vuejs.org/en/getting-started.html). Just read on core concepts of state, getters, mutations and actions
- Passing data from children to parent: [$emit](https://vuejs.org/v2/guide/components.html#Using-v-on-with-Custom-Events) 

- Handling Button Events ( [@click and v-on](https://laracasts.com/series/learn-vue-2-step-by-step/episodes/4) ) : Functions in "methods" . There are also (Event modifiers)[https://vuejs.org/v2/guide/events.html#Event-Modifiers]
- [Computed Properties](https://laracasts.com/series/learn-vue-2-step-by-step/episodes/6) : Reactive functions to transform the internal data of component 
- [Lifecycle methods](https://vuejs.org/v2/guide/instance.html) : created, mounted, updated, destroyed

- [Router](https://laracasts.com/series/learn-vue-2-step-by-step/episodes/26): [Core concepts](http://router.vuejs.org/en/essentials/getting-started.html), [Route Matching](http://router.vuejs.org/en/essentials/dynamic-matching.html) and [Nested Routes](http://router.vuejs.org/en/essentials/nested-routes.html)
- Parent-child content : [slots](https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots)

- [Webpack](https://laracasts.com/series/learn-vue-2-step-by-step/episodes/22) and [vue-cli] (https://vuejs.org/v2/guide/installation.html#CLI)
