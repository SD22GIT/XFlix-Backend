const mongoose = require('mongoose');

const vote = mongoose.Schema({
    upVotes:{
        type: Number,
        default: 0,
        validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
                   }
            },
            downVotes:{
                type: Number,
                default: 0,
                validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
                           }
                    }
});


const videoSchema = mongoose.Schema(
    {
      videoLink: {
        type: String,
        required: true,
        trim: true,
      },
      title: {
        type:String,
        required: true,
        trim: true,
      },
      genre:{
        type:String,
        required: true,
        trim: true,
      },
      contentRating:{
        type:String,
        required: true,
        trim: true,
      },
      releaseDate:Date,
      previewImage:{
        type:String,
        required: true,
        trim: true,
      },
      votes: {
        type: vote,
        default: () => ({})
      },
      viewCount:{
        type: Number,
        default: 0,
        validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
        }
      }    
    }
  );
  
const video = mongoose.model("Video", videoSchema);
module.exports ={ Video: video};