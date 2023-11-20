const studentFieldVerify = (data)=>{
    const {name,scholar_no} = data
    if(name&&scholar_no )
        return true
    return false
}
const teacherFieldVerify = (data)=>{
    const {name,scholar_no} = data
    if(name&&scholar_no )
        return true
    return false
}
const subjectFieldVerify = (data)=>{
    const {name,scholar_no} = data
    if(name&&scholar_no )
        return true
    return false
}


export {studentFieldVerify,teacherFieldVerify,subjectFieldVerify}