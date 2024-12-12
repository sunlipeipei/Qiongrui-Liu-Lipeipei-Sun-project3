const Schema = require('mongoose').Schema;

exports.PostSchema = new Schema({
    username: { type: String, required: false },
    content: { type: String, required: true },
    timestamp: { type: Date, default: () => Date.now() },
    image: {type: String, require: false}
  }, { collection: 'Posts' });
  
  