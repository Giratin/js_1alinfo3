const { Message } = require("../models/message.model");

module.exports = {
    createMessage: (sender_id, textMsg, clb)=>{
        const message = new Message({sender_id, message: textMsg});
        message.save((err,doc)=>{
            Message.find((err,doc)=>{
                clb(err,doc)
            })
        })
    },
    getMessages: (clb) =>{
        Message.find((err,doc)=>{
            clb(err,doc)
        })
    }
}