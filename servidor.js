const express = require('express');
const bodyParser = require('body-parser');

const {Student}= require ('./cliente.js')
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CRUD 

// CREATE -> Post One

app.post('/api/student/',(request, response)=>{
    let jsonStudent = request.body

    const newStudent = Student(jsonStudent) 
        newStudent
        .save((error,student)=>{
            response
            .status(201)
            .send({
                "mensaje": `Student created successfully with ID ${student.id}`,
                "body": student,
                "error": error
            })
        })


})
//---------------------------//
// GET ALL STUDENTS
app.get('/api/student/',(request, response)=>{

    Student
        .find()
        .exec()
        .then(jsonResStudent=>{
            response.status(200)
                .send({
                    "mensaje":"Students List",
                    "body":{jsonResStudent},
                })
                
        })
        .catch(error=> console.log(error))

})

//---------------------------//
// GET ONE STUDENT
app.get("/api/student/:id/", (request, response) => {
    const studentId = request.params.id;
  
    Student
      .findById(studentId)
      .exec()
      .then(student => {
        response.status(200).send(student);
      })
      .catch(error => {
        response.status(404).send(error);
      });
  
  });

//UPDATE
app.put("/api/student/:id/", (request, response) => {
    const studentId = request.params.id;
  
    Student
        .findByIdAndUpdate(studentId, {$set: request.body}, { new: true })
        .exec()
        .then(studenUpdated => {
        response.status(200).send(studenUpdated);
      })
      .catch(error => {
        response.status(400).send(`Error: ${error}`);
      });
  });

//   //DELETE -
app.delete("/api/student/:id/", (request, response) => {
    const studentId = request.params.id;
  
    Student
        .findByIdAndRemove(studentId)
        .exec()
        .then(result => {
        response.status(204).send({
         message: "Deleted",
          body: result
        });
      })
      .catch(error => {
        response.status(404).send(error);
      });
  });



//usar en local host
var PORT = process.env.port || 8801;
 app.listen(PORT,()=>{
    console.log(`Servidor Corriendo en el puerto ${PORT}`)
 })

