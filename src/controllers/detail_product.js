import db from '../models/index';

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

module.exports={
    getDetailProduct: getDetailProduct,
}