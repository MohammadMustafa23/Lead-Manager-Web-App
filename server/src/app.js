import express from 'express'
import leadRouter from './routes/lead.routes.js';
const app = express();

// For parse Json object into JS
app.use(express.json());


app.get('/api/health',(req,res)=>{
    res.status(200).json({
        message : "server health is good"
    })
})

app.use('/api/leads',leadRouter);

export default app;