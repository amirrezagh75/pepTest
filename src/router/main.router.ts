import express, { Request, Response } from 'express';
import { MainService } from '../services';

export const mainRouter = express.Router()

mainRouter.get('/' , (req:Request , res: Response)=>{
    res.send('Hi!')
})

mainRouter.post('/insertData' , async(req:Request , res: Response)=>{
    const body = req.body
    const service = new MainService
    await service.insertData(body)
    res.send("ok")
})

mainRouter.get('/getData' , async(req:Request , res: Response)=>{
    const service = new MainService
    const response = await service.getAllRecords()
    res.json(response)
})