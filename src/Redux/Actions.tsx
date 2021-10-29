import {
    SETSEARCHVALUE
} from './Types'

export const setsearchvalue =(val)=>{
    return{
        type: SETSEARCHVALUE,
        payload: val
    }
}