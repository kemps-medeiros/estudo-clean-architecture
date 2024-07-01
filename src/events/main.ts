import MemoryRepositoryFactory from "./infra/factory/MemoryRepositoryFactory";
import ExpressHttp from "./infra/http/ExpressHttp";
import Router from "./infra/http/Router";

// const connection = new PostgreSQLConnectionAdapter();
const repositoryFactory = new MemoryRepositoryFactory();
const http = new ExpressHttp();
const router = new Router(http, repositoryFactory);
router.init();
http.listen(3002);