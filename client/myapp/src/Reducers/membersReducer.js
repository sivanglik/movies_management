const membersReducer = (state = [] , action) =>{

    switch(action.type){
        case "ADD_ALL_MEMBERS":{
            return action.payload;
        }
        case "DELETE_MEMBER":{
           
             return state.filter(member => member._id !== action.payload)
        }
        default:
            return state;
    }
}

export default membersReducer
