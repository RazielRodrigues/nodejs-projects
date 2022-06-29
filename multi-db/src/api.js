const Hapi = require('hapi');
const MongoStrategy = require('./db/strategies/mongodb/MongoStrategy');
const Context = require('./db/strategies/base/contextStrategy');
const heroisSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HeroRoutes = require('./routes/heroRoutes');

const app = new Hapi.Server({
    port: 5000
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoStrategy.connect();
    const context = new Context(new MongoStrategy(connection, heroisSchema));

    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
    ]);

    await app.start();
    console.log('server up', app.info.port);

    return app;
}

module.exports = main();