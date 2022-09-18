const Employee = require("../Models/Employee");

exports.addEmployee = async (req,res) =>{
    const {name ,email , password  , type , gender , age , experience ,technicalExpertise,professionalExpertise,intelligenceExpertise } = req.body;
    try {
        
        let emp = await Employee.findOne({email})
        if(emp){
            res.status(409).json({
                status:false,
                message: 'Employee already exists'
            })
        }else{

            let agg = (technicalExpertise + professionalExpertise + intelligenceExpertise) / 3

            let exp = agg > 70 ? 'Expert' : agg < 70 && agg > 40 ?  'Intermediate' : 'Beginner'

            let newEmployee = new Employee({
                name ,email , password , expertise:exp , type , gender , age , experience  ,technicalExpertise,professionalExpertise,intelligenceExpertise
            })
    
            let empRes = await newEmployee.save()
            res.status(200).json({
                status:true,
                message: empRes
            })
        }

        
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        })
    }
}


exports.loginEmployee = async (req,res) =>{
    const { email , password } = req.body;
    try {
        let employee = await Employee.findOne({
            email
        })
        if(!employee){
            res.status(404).json({
                status:false,
                message: "Employee not found"
            })
        }else{
            if(employee.password != password){
                res.status(400).json({
                    status:false,
                    message: 'Incorrect Password'
                })
            }else{
                res.status(200).json({
                    status:true,
                    message: employee
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

exports.getAllEmployees = async (req,res) =>{
    try {
        let employees = await Employee.find({})
      
                res.status(200).json({
                    status:true,
                    message: employees
                })

    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        })
    }
}