const movieReducer = (state = [] , action) =>{

    switch(action.type){
        case "ADD_ALL_USERS":{
            return action.payload;
        }
        case "DELETE_USER":{
           
             return state.filter(user => user._id !== action.payload)
        }
        default:
            return state;
    }
}

export default movieReducer
