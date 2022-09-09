const mongoose = require('mongoose'),
Schema = mongoose.Schema,

chatSchema = new Schema({
  content:{
    type: String,
    required: true
  },
  userName:{
    type: String,
    required: true
  },
  user:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
},{
  timestamps: { createdAt: 'sentAt', updatedAt: 'modifiedAt' },
});

module.exports = mongoose.model('Message', chatSchema);