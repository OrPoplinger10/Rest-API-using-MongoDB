import express from "express";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/router-not-found";
import appConfig from "./4-utils/app-config";
import productsRoute from "./6-routes/product-routes";
import dal from "./4-utils/dal";

const server = express();

server.use(express.json());
server.use("/", productsRoute);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, async () => {
    // Connecting to the database:
    await dal.connect();
    // After connecting to the database I start listening:
     console.log("Listening on http://localhost:" + appConfig.port);
});
