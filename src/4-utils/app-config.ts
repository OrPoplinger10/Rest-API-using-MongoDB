class AppConfig {

    // Server Port:
    public port = 4000;

    // MongoDb connection string:
    public connectionString = "mongodb://127.0.0.1:27017/northwind";

}

const appConfig = new AppConfig();

export default appConfig;
