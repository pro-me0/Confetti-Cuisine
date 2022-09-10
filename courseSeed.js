"use strict";

const mongoose = require("mongoose"),
  Course = require("./models/course");
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://mazi:mazi.atlas@procluster.5oeffmz.mongodb.net/confetti" || "mongodb://localhost:27017/lesson18",
  { useNewUrlParser: true }
);
Course.remove({})
  .then(() => {
    return Course.create({
      title: "Egusi Soup 🍲",
      description: "Get to learn about the popular local soup of indi-Igbo",
      ingredients: ["Egusi", "Achi", "Pepper", "Salt", "etc"],
      cost: 5500
    });
  })
  .then(course => console.log(course.title))
  .then(() => {
    return Course.create({
      title: "Abacha 🥗 (African Salad)",
      description: "Cook the wonders of casava",
      ingredients: ["Casava", "Palm_Oil", "etc"],
      cost: 1700
    });
  })
  .then(course => console.log(course.title))
  .then(() => {
    return Course.create({
      title: "Jelof Rice 🍚",
      description: "Settle the battle of jellof rice if west Africa",
      ingredients: ["Rice", "Spices", "Oil", "etc"],
      cost: 7000
    });
  })
  .then(course => console.log(course.title))
  .catch(error => console.log(error.message))
  .then(() => {
    console.log("DONE");
    mongoose.connection.close();
  });
