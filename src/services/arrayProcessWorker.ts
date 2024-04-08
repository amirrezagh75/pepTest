import { parentPort, workerData } from 'worker_threads';
import { BodyDataInput } from '../interfaces';
import { compareRanges } from '../../utils'

const checkArrays =(message: BodyDataInput) => {
  const output = []
  if(message.input && message.main){

    const mainData = message.main;
    const inputData = message.input;
    const xRange = [mainData.x , mainData.x + mainData.width]
    const yRange = [mainData.y , mainData.y + mainData.height]
  
    for(let i=inputData.length - 1; i>=0; i--){
  
      const xInRange = [inputData[i].x , inputData[i].x + inputData[i].width]
      const yInRange = [inputData[i].y , inputData[i].y + inputData[i].height]
      
      if (compareRanges(xRange , xInRange))
          if(compareRanges(yRange , yInRange))
              output.push(inputData[i])
    }
  }
  return output;
};

if(parentPort){
  const finalRes = checkArrays(workerData)
  parentPort.postMessage(finalRes)
}