require('colors');

const Message = require('../models/message'),
User = require('../models/user');

module.exports = {
  io:(io)=> {
    io.on("connection", client => {
      console.log("> new connection".green);

      Message.find({})
      .sort({sentAt: -1})
      .limit(10).then(messages => {
        client.emit("load all messages", messages.reverse())
      })
      client.on("disconnect", () => {
        client.broadcast.emit("user disconnected");
        console.log("> user disconnected".red);
      });
      client.on("load all messages", (data) => {
        client.broadcast.emit("load all messages", data);
      });
      client.on("message", (data) => {
        console.log(`${data.userName}
  ...${data.content}`.cyan)
        let messageAttributes = {
        content: data.content,
        userName: data.userName,
        user: data.userId,
        /*date: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
        user: cu*/
      }
      User.findById(messageAttributes.user).then((user) => {
        Message.create(messageAttributes).then((message) => {
          io.emit("message", message);
        })
        .catch((e) => {
          console.log(`Invalid User: ${e.message}`)
        })
      }).catch(e => {
        console.log('Invalid _ID ||',e.message)
      })
    });
  });
},
delete: (req, res, next) => {
  let mid = req.params.m;
  Message.findByIdAndRemove(mid)
  .then((del) =>{
    console.log(`${del.userName}`.cyan, `deleted`.brightRed, `"${del.content}"`.white);
    next();
  }).
  catch(e => {
    console.log('Unable to delete chat ||', e.message)
  })
},
respondJSON:(req, res) =>{
  Message.find({})
  .sort({sentAt: -1})
  .limit(10)
  .then(m => {
    res.json({
      data: true,
      messages: m
    })
  })
}

}