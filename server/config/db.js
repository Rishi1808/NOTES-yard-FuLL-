const mongoose=require('mongoose');
mongoose.set('strictQuery' ,false);
const conncectDB=async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected DB ${conn.connection.host}`)
    }catch(error){
        console.log(error);

    }
}
module.exports = conncectDB;