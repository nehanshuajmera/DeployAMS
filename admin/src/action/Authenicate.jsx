import axios from "axios"

const authenticate = ()=>{
    axios.get("/api/authentic").then(res=>console.log(res))
    .catch(err=>console.log(err))
    return false
}


export default authenticate