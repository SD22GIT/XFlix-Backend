const {Video} = require("../models");

const convertRatingToInteger = (ratingInString) =>{
  let ratingInNumber="";
  for(let i=0;i<ratingInString.length;++i)
  {
   if(ratingInString.charAt(i)!='+')
   {
    ratingInNumber =ratingInNumber+ ratingInString.charAt(i);
   }
  }
  
  return parseInt(ratingInNumber);
}

const getRegexObjForTitle = (title) =>
{
const obj = {title: {$regex: title}};
return obj;
}

const getRegexObjForGenres = (genres) =>
{
  const genresValues = genres.split(",");
  let regexObj = [];
  for(let i=0;i<genresValues.length;++i)
  {
   regexObj.push({genre: {$regex: genresValues[i]}});
  }
  return regexObj;
}

const getRegexObjForRating = (rating) =>
{
  console.log(rating);
  const ratingInNumber = convertRatingToInteger(rating);
  let regexObj = [];
  for(let i=ratingInNumber;i<=18;++i)
  {
   regexObj.push({contentRating:  i+"+"});
  }
  regexObj.push({contentRating:  "anyone"});
  regexObj.push({contentRating:  "Anyone"});

  return regexObj;
}


 const getVideos =  async () => {
  const result = await Video.find({});
  return result;
  };

  const getVideosByTitle = async(title) =>{
    const result = await Video.find(getRegexObjForTitle(title));
    return result;
  }

  const getVideosByGenres = async(genres) =>{
    const result = await Video.find({$or: [...getRegexObjForGenres(genres)]});
    return result;
  }

  const getVideosByContentRating = async(contentRating) =>{
    const result = await Video.find({$or: [...getRegexObjForRating(contentRating)]});
    return result;

  }

  const getVideosByTitleGenreRating = async(title,genres,contentRating) =>
  {
    const videosFilteredByRating = await getVideosByContentRating(contentRating);
    const genresValue = genres.split(",");
    const result = [];
    for(let i=0;i<videosFilteredByRating.length;++i)
    {

      if(genresValue.includes(videosFilteredByRating[i].genre))
      {
          if(videosFilteredByRating[i].title.toLowerCase().includes(title.toLowerCase()))
          {
            result.push(videosFilteredByRating[i]);
          }
      }
    }

    return result;
  }

  const getVideosInSortedOrder = async (sortBy)=>
  {
    const regexObj = {};
    regexObj[sortBy] = "desc";
    const result = await Video.find({}).sort(regexObj).exec();
    return result;
  }

  const getVideoById =  async (id) => {
    try
    {
    const result = await Video.findById(id);
    return result;
    }
    catch(err)
    {
      console.log(err.stack);
    }
    };



const uploadVideo = async (video) =>
{
  let result;
  try{
  result = await Video.create(video);
  }
  catch(err)
  {
    console.log(err);
  }
 return result;
}

const updateVotes = async (id,vote,change) =>
{
  const video =await getVideoById(id);
  if(vote=="upVote")
  {
    let value = video.votes.upVotes;
    video.votes.upVotes = increaseDecreaseVote(change,value);
  }

  if(vote=="downVote")
  {
    let value = video.votes.downVotes;
    video.votes.downVotes = increaseDecreaseVote(change,value);
  }

 const savingVideo = new Video(video);
 const result = await savingVideo.save();
 return result;
}

const increaseDecreaseVote = (change,votes)=>
{
  if(change=="increase")
  {
    return increaseBy1(votes);
  }
  else if(change=="decrease")
  {
    return decreaseBy1(votes);
  }
}

const increaseBy1 = (number)=>{
  number = Number(number);
  return number+1;
}

const decreaseBy1 = (number)=>{
  number = Number(number);
  return number-1;
}

const updateViews = async(id)=>
{
  const video =await getVideoById(id);
  let value = video.viewCount;
  video.viewCount = increaseBy1(value);
  const savingVideo = new Video(video);
  const result = await savingVideo.save();
  return result;
}
  
  module.exports = {
    getVideos,
    getVideosByTitle,
    getVideosByGenres,
    getVideosByContentRating,
    getVideosByTitleGenreRating,
    getVideosInSortedOrder,
    getVideoById,
    uploadVideo,
    updateVotes,
    updateViews
  };
  