const actionType={
    SET_LOGIN:"SET_LOGIN",
    SET_ERROR:"SET_ERROR",
    SET_LOADING:"SET_LOADING",
    SET_LOGOUT:"SET_LOGOUT",
    SET_AUTHENTICATE:"SET_AUTHENTICATE",
    SET_DATA:"SET_DATA",
    SET_MSG:"SET_MSG",
    SET_USERTYPE:"SET_USERTYPE",
}

const userType = {
    Admin:"Admin",
    Teacher:"Teacher"
}

const msgType = {
    SUCCESS:"SUCCESS",
    WARNING:"WARNING",
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

const API_Type ={
    student:"student",
    teacher:"teacher",
    subject:"subject",
}


export {actionType, errorType, API_Type, msgType, userType } 