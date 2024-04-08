export interface BodyDataInput{
    main: InputArray,
    input: InputArray[]
}

export interface InputArray{
    x: number,
    y: number,
    width: number
    height:number,
}