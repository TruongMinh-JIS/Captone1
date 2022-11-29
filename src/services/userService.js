import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //lưu ý, truyền vào đúng password cần hash
            // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
            let hashPassWord = await bcrypt.hashSync(password, salt);

            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }

    })
}

let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUsername(username);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['username', 'roleId', 'password'],
                    where: { username: username },
                    raw: true,

                });
                if (user) {
                    //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
                    // Cách 1: dùng asynchronous (bất đồng bộ)
                    let check = await bcrypt.compareSync(password, user.password);


                    // Cách 2: dùng synchronous  (đồng bộ)
                    // let check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';

                        delete user.password;//ẩn pw
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, plz try other email`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUsername = (userName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { username: userName }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers= (userId)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let users='';
            if(userId ==='ALL'){
                users= await db.User.findAll({
                    attributes:{
                        exclude: ['password'] // để ẩm pw đi
                    }
                })
            }
            if(userId && userId !=='ALL'){
                users= await db.User.findOne({
                    where: { id:userId },
                    attributes:{
                        exclude: ['password'] // để ẩm pw đi
                    }
                })
            }

            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser=(data)=>{
    return new Promise( async (resolve,reject)=>{
        try {
            //check email is exist ???
            let check=await checkUsername(data.username);
            if(check === true){
                resolve({
                    errCode:1,
                    errMessage:'User name is already in used, Plz try another User name'
                });
                
            }else{
                let hashPassWordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    username: data.username,
                    email: data.email,
                    password: hashPassWordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                })
            }
            
            resolve({
                errCode:0,
                errMessage:'ok'
            });
            
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser=(userId) =>{
    return new Promise( async(resolve,reject)=>{
        let user = await db.User.findOne({
            where: { id:userId}
        })
        if(!user) {
            resolve({
                errCode:2,
                errMessage:'The user is not exist'
            })
        }
        await db.User.destroy({
            where: { id:userId}
        });

        resolve({
            errCode:0,
            errMessage:'The user is delete'
        })
    })
}

let updateUserData=(data)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:'Missing required parameters!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false

            })
            if (user) {
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address  = data.address 

                await user.save();
                // await db.User.save({
                //     firstName : data.firstName,
                //     lastName : data.lastName,
                //     address  : data.address
                // })
                
                // let allUsers = await db.User.findAll();
                resolve({
                    errCode:0,
                    errMessage:"Update the user succeds"
                });

            } else {
                resolve({
                    errCode:1,
                    errMessage:`User not found!`
                });

            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage:'Missing required parameter'
                })
            }else{
                let res = {};
                let allcode= await db.Allcode.findAll({
                    where:{type: typeInput}
                });
                res.errCode=0;
                res.data = allcode;
                resolve(res)
            }
            
            
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers:getAllUsers,
    createNewUser: createNewUser,
    deleteUser:deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}