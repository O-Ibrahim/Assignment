module.exports = {
  port: process.env.PORT || 80,
  mongoURI: "mongodb://127.0.0.1:27017/test",
  mongoURINestrom: `mongodb://admin: admin_123@nestrom-playground1-shard-00-00-hof
  dl.mongodb.net :27017`,
  host: "localhost",
  dataSource: "./data/data.csv",
  saltRounds: 10,
  elasticSearchURI: `https://search-nestrom-playground1-pe3bbwxgkncelmmg6u3d45exdq
  .eu-west-1.es.amazonaws.com`,
  elasticSearchURILocal: `localhost:9200`
};
