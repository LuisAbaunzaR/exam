
const mongoose =require('mongoose');
const url='mongodb://examUser:master01@ds227243.mlab.com:27243/exam'

mongoose.connect(url,{useNewUrlParser: true,},()=>{
    console.log("Conexion exitosa con la base de Datos")
})

const Schema= mongoose.Schema
const ObjectId= mongoose.Schema.ObjectId

const studentSchema = Schema({
    studentId:ObjectId,
    datecreate:{type:Date, default:Date.now},
    name:{type: String, require: true},
    age: {type: Number, require: true},
    address:{type: String, require: true}
    
})



const Student = mongoose.model('Student',studentSchema) 

module.exports={Student}
