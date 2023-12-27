const httpStatus = require("http-status");
const { videosService } = require("../services");
const {Video} = require("../models");

const getVideos = async (req, res, next) => {
    let result;
      if(req.query.title && req.query.genres && req.query.contentRating)
      {
        result = await videosService.getVideosByTitleGenreRating(req.query.title,req.query.genres,req.query.contentRating);
      }
      else if(req.query.title)
      {
      
         result = await videosService.getVideosByTitle(req.query.title);
      }
      else if(req.query.genres)
      {
        result = await videosService.getVideosByGenres(req.query.genres);
      }
      else if(req.query.contentRating)
      {
        result = await videosService.getVideosByContentRating(req.query.contentRating);
      }
      else if(req.query.sortBy)
      {
        result = await videosService.getVideosInSortedOrder(req.query.sortBy);
      }
      else
      {
    result = await videosService.getVideos();
      }

    res.send({videos:result});
 };

 const getVideosById = async(req,res,next) =>
 {
  console.log(req.params);
   const result = await videosService.getVideoById(req.params.videoId);
   res.send(result);
 }


 const insertVideo = async (req,res,next) =>
 {
   const result = await videosService.uploadVideo(req.body);
   res.status(201).send(result);
 }

 const updateVotes = async(req,res,next) =>
 {
    const result = await videosService.updateVotes(req.params.videoId,req.body.vote,req.body.change);
    res.send(result);
 }

 const updateViews = async(req,res,next) =>
 {
  const result = await videosService.updateViews(req.params.videoId);
  res.send(result);
 }


module.exports = {
  getVideosById,
getVideos,
insertVideo,
updateVotes,
updateViews
};
