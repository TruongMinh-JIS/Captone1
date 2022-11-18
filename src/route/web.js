import  express  from "express";
import detailController from "../controllers/detail_product";
import userController from '../controllers/userController';

let router = express.Router();

let initWebRouter = (app)=>{
    router.get('/',detailController.getDetailProduct);
    router.get('/crud', detailController.getCRUD);

    router.post('/post-crud', detailController.postCRUD);
    router.get('/get-crud', detailController.displayGetCRUD);
    router.get('/edit-crud', detailController.getEditCRUD);

    router.post('/put-crud', detailController.putCRUD);
    router.get('/delete-crud', detailController.deleteCRUD);



    router.post('/api/login', userController.handleLogin);
    
    return app.use("/",router);
}

module.exports = initWebRouter;