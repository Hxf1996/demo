import {
    createApp,
} from './main';

const isDev = process.env.NODE_ENV !== 'production';

export default context => new Promise((resolve, reject) => {
    const s = isDev && Date.now();
    const {
        app,
        router,
        store,
    } = createApp();
    const {
        url,
    } = context;
    const {
        fullPath,
    } = router.resolve(url).route;

    if (fullPath !== url) {
        return reject(new Error({
            url: fullPath,
        }));
    }

    router.push(url);

    router.onReady(() => {
        const matchedComponents = router.getMatchedComponents();

        if (!matchedComponents.length) {
            return reject(new Error({
                code: 404,
            }));
        }
        return Promise.all(matchedComponents.map(({
            asyncData,
        }) => asyncData && asyncData({
            store,
            route: router.currentRoute,
        }))).then(() => {
            if (isDev) {
                console.log(`data pre-fetch: ${Date.now() - s}ms`);
            }
            context.state = store.state;
            resolve(app);
        }).catch(reject);
    }, reject);
    return true;
});
