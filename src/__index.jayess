require(`bootstrap/dist/css/bootstrap.min.css`);
require(`font-awesome/css/font-awesome.min.css`);
require(`./styles/index.css`);


const m = require(`mithril`),
      BODY = window.document.body;

const DataService = require(`./store`);
DataService.init();

const App = require(`./app`);

m.route.mode = `hash`;
m.route(BODY, `/index`, {
  '/:page': App
});
