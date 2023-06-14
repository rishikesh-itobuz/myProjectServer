import express from 'express';
import dotenv  from 'dotenv';
import cors from 'cors'
import router from './routers/router.js';
import con from './models/con.js';
import errorHandler from './middleware/errorHandler.js';





dotenv.config();
const app = express();
const port =process.env.PORT
app.use(cors());
app.use(express.json());

app.use(router)
con();
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})

