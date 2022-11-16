import  express  from "express";
import detailController from "../controllers/detail_product";

let router = express.Router();

let initWebRouter = (app)=>{
    router.get('/',detailController.getDetailProduct);

    //rest api  
    
    return app.use("/",router);
}

module.exports = initWebRouter;