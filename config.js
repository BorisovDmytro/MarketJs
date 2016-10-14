var config = {
  host: "127.0.0.1",
  port: 8080,
  databaseUrl: "mongodb://localhost/market"
}


exports.get = function (params) {
  return config[params];
}