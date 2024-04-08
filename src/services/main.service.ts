import { Worker } from 'worker_threads';
import { BodyDataInput } from '../interfaces';
import os from 'os'
import { InputArray } from '../interfaces/insertData.interface';
import { Records } from '../models';
import { dbConfiguration } from '../configs';

import { TransformPlainToInstance } from "class-transformer";


export class MainService{

    insertData = async (inputBody: BodyDataInput) => {
        // using half of cpu cores
        const threadCount = Math.round(os.cpus().length / 2) ;
    
        const inputParts = this.divideArray(inputBody.input, threadCount);
        
        const outPutParts = []
        const workerPromise = []
    
        for (let i = threadCount; i >=0 ; i--) {
            if(i < inputParts.length){
    
                const workerData = {
                    main: inputBody.main,
                    input: inputParts[i],
                    path:"./services/arrayProcessWorker.ts"
                };
                workerPromise.push(this.createWorker(workerData))
            }
        }
    
        const thread_results= await Promise.all(workerPromise)
    
        for (let result of thread_results){
            if(result){
                outPutParts.push(...result)
            }
        }
        console.log(`outputParts is:\n${JSON.stringify(outPutParts)}`)
        
        const recordRepo = dbConfiguration.getRepository(Records)
        const response = await recordRepo.save(outPutParts)
        
        return response
    }
    
    private divideArray=<T>(arr: T[], numWorkers: number): T[][] =>{
        const chunkSize = Math.ceil(arr.length / numWorkers);
        const chunks: T[][] = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    }
    
    private createWorker = (workerData: BodyDataInput): Promise<InputArray[]> => {
        return new Promise((resolve, reject) => {
            const worker = new Worker("./src/worker.js", {workerData})
    
            worker.on("message", (data) => {
                resolve(data)
            })
    
            worker.on("error", (error) => {
                reject(error)
            })
    
        })
    }

    getAllRecords = async()=>{
        const recRepo = dbConfiguration.getRepository(Records)
        const records = await recRepo.find()

        return records
    }
}
