const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const Koa = require('koa');
const compression = require('compression');
const microcache = require('route-cache');
const {
    createBundleRenderer,
} = require('vue-server-renderer');

const resolve = file => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';
const app = new Koa();

function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15,
        }),
        basedir: resolve('./dist'),
        runInNewContext: false,
    }));
}

let renderer;
let readyPromise;
const templatePath = resolve('./index.html');

if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const bundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    renderer = createRenderer(bundle, {
        template,
        clientManifest,
    });
} else {
    readyPromise = require('./webpack/setup-dev-server')(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options);
        },
    );
}

app.use(compression({
    threshold: 0,
}));
app.use(require('koa-static')('./dist', {
    maxAge: isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
}));

app.use(microcache.cacheSeconds(1, req => req.originalUrl));

function render(res) {
    const s = Date.now();

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Server', serverInfo);

    const handleError = (err) => {
        if (err.url) {
            res.redirect(err.url);
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found');
        } else {
            res.status(500).send('500 | Internal Server Error');
            console.error(err.stack);
        }
    };

    const context = {
        title: 'Vue HN 2.0',
    };

    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err);
        }
        res.send(html);
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`);
        }
    });
}

app.use(async (ctx) => {
    await readyPromise.then(() => render(ctx));
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
