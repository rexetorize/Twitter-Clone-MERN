const Tweets = require('../models/tweetsModel');
const User = require('../models/userModel');


const jimp = require('jimp');

const fs = require('fs');
const path = require('path');


class TweetController{



    async saveTweet(req, res){
      
        if(req.body.tweet === '' && req.body.tweetImg === ''){
            return res.status(400).json({message : 'Tweet body cannot be empty'})
        }

        let tweetImgPath = ``  
            
        if(req.body.tweetImg !== ''){
            const tweetImg = req.body.tweetImg
            tweetImgPath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
            
            try{
                const tweetImgBuffer = Buffer.from(
                    tweetImg.replace(/^data:image\/(png|jpg|gif|jpeg);base64,/, ''),
                    'base64'
                );

                
                const jimResp = await jimp.read(tweetImgBuffer)
                
                jimResp.resize(720, jimp.AUTO).write(path.resolve(__dirname, `../storage/tweetImg/${tweetImgPath}`));

            }
            catch(err){
                console.log(err.message);
                return res.status(500).json({message: 'Server error at 35'})
            }
        }
   
        const newTweet = new Tweets({
            tweet: req.body.tweetText !== "" ? req.body.tweetText : "",
            tweetImg: tweetImgPath === "" ? "" : '/storage/tweetImg/' + tweetImgPath,
            createdBy: req.user._id,
            creatorName: req.user.name,
            creatorImg: req.user.pfp,
            creatorUsername: req.user.username,
            replying: false,
        })

        try{
            const saved = await newTweet.save();

            const user = await User.findById(req.user._id);
            user.tweets.push(saved._id);
            await user.save();

            return res.status(200).json({message : 'success'})
        }catch(err){
            console.log(err.message);
            return res.status(500).json({message : 'Error saving tweet'})
        }



        

    }

    async getTweets(req, res){
        try{
            await User.findById(req.user._id).populate('tweets').sort({createdAt : -1}).exec(function(err, user){
                if(err){
                    console.log(err.message);
                    return res.status(500).json({message : 'Error getting tweets'})
                }
                return res.status(200).json({tweets : user.tweets})
            })
        }catch(err){
            return res.status(500).json({message : 'Error getting tweets'})
        }
    }

    async getTweetById(req, res){

        const tweetId = req.params.id;

        try{
            const tweet = await Tweets.findById(tweetId);
            return res.status(200).json({tweet : tweet})
        }catch(err){
            return res.status(500).json({message : 'Error getting tweet'})
        }
    }

    async getAllTweets(req, res){
        try{
            const tweets = await Tweets.find({}).where('replying').equals(false).sort({createdAt: -1}).limit(10);
            return res.status(200).json({tweets : tweets})
        }catch(err){
            return res.status(500).json({message : 'Error getting tweets'})
        }
    }

    async getTweetsByUserId(req, res){
        const userId = req.params.id;

        try{
            const tweets = await Tweets.find({createdBy: userId}).where('replying').equals(false).sort({createdAt: -1});
            return res.status(200).json({tweets : tweets})
        }catch(err){
            return res.status(500).json({message : 'Error getting tweets'})
        }
    }

    async replyTweet(req, res){
        
        if(req.body.tweet === '' && req.body.tweetImg === ''){
            return res.status(400).json({message : 'Tweet body cannot be empty'})
        }

        if(req.body.username=== "" || req.body.pfp === "" || req.body.id === "", req.body.tweetId === ""){
            return res.status(400).json({message : 'Tweet body cannot be empty'})
        }

        let tweetImgPath = ``  
            
        if(req.body.tweetImg !== ''){
            const tweetImg = req.body.tweetImg
            tweetImgPath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
            
            try{
                const tweetImgBuffer = Buffer.from(
                    tweetImg.replace(/^data:image\/(png|jpg|gif|jpeg);base64,/, ''),
                    'base64'
                );

                
                const jimResp = await jimp.read(tweetImgBuffer)
                
                jimResp.resize(720, jimp.AUTO).write(path.resolve(__dirname, `../storage/tweetImg/${tweetImgPath}`));

            }
            catch(err){
                console.log(err.message);
                return res.status(500).json({message: 'Server error at 35'})
            }
        }
        

        const newReply = new Tweets({
            tweet: req.body.tweetText !== "" ? req.body.tweetText : "",
            tweetImg: tweetImgPath === "" ? "" : '/storage/tweetImg/' + tweetImgPath,
            createdBy: req.user._id,
            creatorName: req.user.name,
            creatorImg: req.user.pfp,
            creatorUsername: req.user.username,
            replying : true,
            replyingToUsername : req.body.username,
            replyingToUser : req.body.id,
            replyingToTweetId : req.body.tweetId,
            

        })


        try{
            const tweetWhichIsBeingRepliedTo = await Tweets.findById(req.body.tweetId);
            tweetWhichIsBeingRepliedTo.replies.push(newReply._id);
            await tweetWhichIsBeingRepliedTo.save();
            
            const saved = await newReply.save();
            return res.status(200).json({message : 'success', reply : saved})
        }catch(err){
            console.log(err.message);
            return res.status(500).json({message : 'Error saving tweet'})
        }
    }

    async getReplies(req, res){
        const tweetId = req.params.id;

        try{
            const replies = await Tweets.find({}).where('replying').equals(true).where('replyingToTweetId').equals(tweetId).sort({createdAt: -1});
            return res.status(200).json({replies : replies})
        }catch(err){
            return res.status(500).json({message : 'Error getting replies'})
        }
    }

    async getData(req, res){
        const tweetId = req.params.id;

        try{
            const data = await Tweets.findById(tweetId);
            return res.status(200).json({tweetData : data})
        }catch(err){
            return res.status(500).json({message : 'Error getting data'})
        }
    }

    async likeUnlikeTweet(req, res){
        const tweetId = req.params.id;
        const userId = req.user._id;

        try{
            const tweet = await Tweets.findById(tweetId);


            if(tweet.likedBy.includes(userId)){
                tweet.likedBy.pull(userId); 
            }else{
                tweet.likedBy.push(userId);
        
            }
            const saved = await tweet.save();

            return res.status(200).json({message : 'success', tweet : saved})
        }catch(err){
            return res.status(500).json({message : 'Error liking tweet'})
        }
    }

}


module.exports = new TweetController;