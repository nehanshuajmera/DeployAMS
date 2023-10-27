const Logs = require("../Model/LogsModel");

const Recordlog=(props) => {
    // console.log(props);
    const newlog = new Logs({user_id:props.user_id,ip:props.ip,what:props.what,created_at:new Date()});
    newlog.save().then(() => console.log(""))
        .catch((err) => console.log("Error: " + err)); 
};

module.exports=Recordlog;