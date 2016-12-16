var config = {
  host: "127.0.0.1",
  port: 8080,
  databaseUrl: "mongodb://127.0.0.1:27017/market"
}


exports.get = function (params) {
  return config[params];
}