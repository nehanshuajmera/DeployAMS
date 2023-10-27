const User = require("../Model/UserModel");

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const generateuniqueusername = async ({username}) => {
    var sz=2;
    while(1){
        var newusername=username+makeid(sz);
        var existornot=await User.findOne({username:newusername});
        if(!existornot){
            return newusername
        }
        sz++;
    }
}

// generateuniqueusername({username:"sharma39vishal"})

module.exports = generateuniqueusername;