"use strict";

module.exports = {
  index: (req, res) => {
    res.render("index")
    setTimeout(() => {
      if (process.env.terminate) process.exit()
    }, 3000)
  },
  chat: (req, res) => {
    res.render("chat");
  }
};
