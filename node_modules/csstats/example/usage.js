var csstats = require('../index'),
    path = require('path');

csstats.parse(path.resolve(__dirname, './data/csstats.dat'), function (entityList) {
  console.log(entityList);
  console.log(entityList[0].name);
});