import mongoose from "mongoose";

const con =async()=>{
    try{
        await mongoose.connect('mongodb+srv://rishikesh:123@cluster0.vg2dofm.mongodb.net/');
        console.log("Connected to Database");
    }
    catch(error){
        console.log(error)
    }
  
}
export default con;


