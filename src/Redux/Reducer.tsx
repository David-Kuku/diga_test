import {
    SETSEARCHVALUE
} from './Types'

export const initialState = {
    searchvalue:""
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SETSEARCHVALUE:
            return {
                ...state,
                searchvalue: action.payload
            }
        
        default: return state
    }
}
