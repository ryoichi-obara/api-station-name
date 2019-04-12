
(async () => {
  const event = {
    queryStringParameters: {
      q: '新宿',
    },
  };

  const res = await require('./index').handler(event);

  console.log(res);
})();
