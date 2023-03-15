const express = require('express');
const router = express.Router();
const Joi = require('joi');

var members = [
    {id:1,name:"pradeep",age:"26",gender:"M"},
    {id:2,name:"kumar",age:"27",gender:"M"},
    {id:3,name:"goud",age:"25",gender:"M"}
]


router.get('/', (req, res) => {
   
    res.render('index',{title:"first view",message :"first view "})
})

router.get("/:id",(req,res)=>{
    const member = members.find(member => member.id == req.params.id);
    if(!member) res.status(404).send("The requested Member is not available");
    res.send(member);
})

router.post('/add',(req,res)=>{

    const { error, value } = schema.validate(req.body);

  // Return a 400 error if the request body is invalid
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
    const member = parseAndBuildRequestBody(value);
    members.push(member);
    res.status(201).json({
       message: 'Member created with id '+member.id+' sucessfuly'
    });
})

router.put('/:id' , (req,res)=>{

     // Get the user ID from the URL parameters
     const id = parseInt(req.params.id);

    // Find the user with the matching ID
    const member = members.find(m => m.id ===parseInt(req.params.id));

    // If no user is found, return an error response
    if(!member) {
        return res.status(404).send("The Member with the given ID is not exist");
    } 

    // Validate the name length
    const result = validate(member);
    if(!result) {
        res.status(400).send('Name is Required & should be 4 characters');
        return;
    }
    
   const index =  members.findIndex(member);
   members[index].name = req.body.name;
   members[index].age = req,body.age;
   members[index].gender = req.body.gender;

   res.json({
      message:'Member created with id '+member.id+' sucessfuly with '+JSON.stringify(member),

   })

    
})

function parseAndBuildRequestBody(member){
     return {
        id:member.id,
        name: member.name,
        age: member.age,
        gender: member.gender
 }

}


function validate(member){

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        age: Joi.number().integer().min(18).max(120).required()
      });

    return schema.validate(req.body);
}


module.exports = router;
