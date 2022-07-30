const Manager = require("../Models/Manager");

exports.createManager = async (req,res) =>{
    const {name , email , password} = req.body;
    try {
        let newManager = new Manager({
            name , email , password
        })
        let managerRes = await newManager.save()
        res.status(200).json({
            status:true,
            message: managerRes
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        })
    }
}


exports.loginManager = async (req,res) =>{
    const {email , password} = req.body;
    try {
        let manager = await Manager.findOne({
           email 
        })
        if(!manager){
            res.status(404).json({
                status:false,
                message: 'Manager not found.'
            })
        }else{
            if(password != manager.password){
                res.status(403).json({
                    status:false,
                    message: 'Incorrect Password.'
                })
            }else{
                res.status(200).json({
                    status:true,
                    message: manager
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        })
    }
}
