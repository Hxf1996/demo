import {
    createApp,
} from './main';

const {
    app,
    router,
    store,
} = createApp();

/* eslint-disable no-underscore-dangle */
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);
        let diffed = false;
        /* eslint-disable no-return-assign */
        const activated = matched.filter((c, i) => diffed || (diffed = (prevMatched[i] !== c)));
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
        if (!asyncDataHooks.length) {
            return next();
        }

        return Promise.all(asyncDataHooks.map(hook => hook({
            store,
            route: to,
        })))
            .then(() => {
                next();
            })
            .catch(next);
    });

    app.$mount('#app');
});


if (window.location.protocol === 'https:' && navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js');
}
