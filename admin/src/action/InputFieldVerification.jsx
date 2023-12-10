const studentFieldVerify = (data)=>{
    const {name,scholar_no} = data
    if(name&&scholar_no )
        return true
    return false
}
const subjectFieldVerify = (data)=>{
    const {batch, section, branch, course_code, subject_name} = data
    if(batch && section && branch && course_code && subject_name )
        return true
    return false
}
const teacherFieldVerify = (data)=>{
    const {name,email, teacher_id} = data
    if(name&&email&& teacher_id )
        return true
    return false
}


export {studentFieldVerify,teacherFieldVerify,subjectFieldVerify}
