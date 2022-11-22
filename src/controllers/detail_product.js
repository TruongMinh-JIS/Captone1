import db from '../models/index';
import user from '../models/user';
import CRUDService from '../services/CRUDService';
//Xử lý bất đồng bộ dữ liệu
let getDetailProduct = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log(data);
        return res.render('product_page.ejs',{
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log("Lỗi???")
    }
    
    
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}


let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');

}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('-------------------------------------');
    console.log(data);
    console.log('-------------------------------------');

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
    
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // check user data not found

        return res.render('editCRUD.ejs', {
            user: userData
        })

    } else {

        return res.send('User not found')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);

    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
    
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('delete user succeed')
    }
    else {
        return res.send('user not found')
    }
}

module.exports={
    getDetailProduct: getDetailProduct,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}