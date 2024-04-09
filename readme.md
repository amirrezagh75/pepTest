
# Installation

Please use ```npm i ``` to install all the required packages

## Send Data to store
To store data in the database, please use this path:
```http://localhost:PORT/insertData```
Remember, to use the ```POST``` method in here.

## See previous matched records:
To show the list of matched items, please use this path:
```http://localhost:PORT/getData```
Remeber that you need to use ```GET``` method here

##
## Notes

* You need to use ```mySql``` for storing data
* You need to make a copy from ```.env.example``` and name the copy file to ```.env``` and fill the required parameters.

### How does the app work?
In this app, you need to send a ```post``` request like this:
```
{
    main:{x: number, y:number, width:number , height:number},
    input:[
        {x: number, y:number, width:number , height:number},...
        ]
}
```
Then we match the inputs with the main and if it has a common area with the main input we store it inside the database.
* After inserting data we use a multiprocessor to use half of the machine cores, then we split the input array into your machine cores