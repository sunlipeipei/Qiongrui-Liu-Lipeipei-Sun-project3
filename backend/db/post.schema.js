const Schema = require('mongoose').Schema;

// TO DO: Post collection: socialMediaPosts
exports.PostSchema = new Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }, { collection: 'socialMediaPosts' });
  
  