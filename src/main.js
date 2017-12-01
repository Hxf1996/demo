import Vue from 'vue';
import App from './App';
import createStore from './store';
import createRouter from './router';
// import store from './store';

if (process.env.NODE_ENV === 'development') {
    Vue.config.productionTip = true;
}

export default function createApp() {
    const store = createStore();
    const router = createRouter();
    const app = new Vue({
        router,
        store,
        render: h => h(App),
    });
    return {
        app,
        store,
        router,
    };
}
