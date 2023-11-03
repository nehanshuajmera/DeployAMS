const actionType={
    SET_LOGIN:"SET_LOGIN",
    SET_ERROR:"SET_ERROR",
    SET_LOADING:"SET_LOADING"
}


const errorType = {
    WRG:{
        name:"WRG",
        msg:"Incorrect user id or password"
    },
    MISING:{
        name:"MISING",
        msg:"All fields are required"
    },
    SYSERR:{
        name:"SYSERR",
        msg:"Please try after some time"
    },


}
export {actionType,errorType}