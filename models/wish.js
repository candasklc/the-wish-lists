// grab the mongoose module
var mongoose = require('mongoose');

// define the wish model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Wish', {
    title : {type : String, default: ''},
    link : {type : String, default: ''},
    user : {type : String, default: ''}
});