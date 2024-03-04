import * as types from './entity.types.js'

const initialState = {
    personnel: [],
    companies: [] // Initialize companies with an empty array
}

// ... = (entity = [], action, err) => { ...
export const entityReducer = (state = initialState, action, err) => {
    switch (action.type) {

        case types.ENTITY_TABLE_LOAD_SUCCESS:
            return action.payload
        case types.ENTITY_TABLE_DELETE_SUCCESS:
            return state.filter(person => person._id !== action.payload)
        case types.ENTITY_TABLE_ADD_SUCCESS:
            return [...state, action.payload]
        case types.ENTITY_TABLE_UPDATE_SUCCESS:
            return state.map(person => person._id === action.payload._id ? action.payload : person)
        case types.ENTITY_TABLE_FAILED:
            return err
        default:
            return state
    }
}




