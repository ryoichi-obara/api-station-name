const stationsData = require('./N02-17_Station.json');

const response = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin' : '*',
  },
  body: JSON.stringify(body),
});

/** main */
exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  console.log(event.queryStringParameters);

  if (!event.queryStringParameters) {
    return response(200, []);
  }

  const { q } = event.queryStringParameters;

  const res = {};
  const stationNames = stationsData.features
    .map(d => d.properties)
    .filter((d) => d.N02_005.includes(q))
    .forEach((d) => {
      if (res[d.N02_005]) {
        res[d.N02_005].push(d.N02_003);
      } else {
        res[d.N02_005] = new Array(d.N02_003);
      }
    });

  return response(200, res);
};
