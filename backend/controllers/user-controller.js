
const User = require('../models/userModel')
const jimp = require('jimp')
const fs = require('fs')
const path = require('path')
const userDtos = require('../dtos/userDtos')

class UserController{

    verifyAndSendUserData(req, res){
      

        if(req.isAuthenticated()){
            res.json({user : new userDtos(req.user) , isAuth: true});
        }else{
            res.json({user : null , isAuth: false})
        }
    }
    
    async activate(req, res){

            const { name, pfp, username, bio, website, coverImage } = req.body;
            
           try{
               const user = await User.findOne({username: username});
                if(user){
                   return res.status(200).json({err: true , message: '🦔 Username already exists'})
                }
            }
            catch(err){
              return  res.status(500).json({message: 'Server error'})
            }

           


            //profile picture
            const pfpBuffer = Buffer.from(
                pfp.replace(/^data:image\/(png|jpg|gif|jpeg);base64,/, ''),
                'base64'
            );
            
            //cover picture
            const coverImgBuffer = Buffer.from(
                coverImage.replace(/^data:image\/(png|jpg|gif|jpeg);base64,/, ''),
                'base64'
            );

            const pfpPath = `${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}.png`;
                
            const coverImgPath = `${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}.png`;


            //store profile picture and cover picture
            try 
            {
                //saving the cover image
                const savepath = path.join(__dirname, `../storage/cover/${coverImgPath}`);
                fs.writeFileSync(savepath, coverImgBuffer);
                
                //Resizing the profile picture and storing it in the server
                const jimResp = await jimp.read(pfpBuffer);
                jimResp
                    .resize(150, jimp.AUTO)
                    .write(path.resolve(__dirname, `../storage/profile/${pfpPath}`));

                
                
                
                try {

                    const user = await User.findOne({email: req.user.email});    

                    user.name = name;
                    user.username = username;
                    user.bio = bio;
                    user.website = website;
                    user.coverImage = `/storage/cover/${coverImgPath}`;
                    user.pfp = `/storage/profile/${pfpPath}`;
                    user.activated = true;

                   const saved = await user.save();
                   return res.status(200).json({err: false, message: 'User successfully activated 😃', user : new userDtos(saved) });
                }
                catch(err){
                    console.log(err);
                   return res.status(500).json({ message: 'Error updating user profile', error: err });
                }
            }

            catch (err) 
            {
                console.log(err);
               return res.status(500).json({errcode : 'IMG_FALIURE' , message: err.message });
            }

          

        }

        async updateProfile(req, res){

            try{
                const user = await User.findById(req.user._id);

                const { name, pfp, username, bio, website, coverImage } = req.body;

            
            

                if(name === ""){
                    return res.status(400).json({err: true , message: '🦔 Name is required'})
                }
                if(username === ""){
                    return res.status(400).json({err: true , message: '🦔 Username is required'})
                }
                if(pfp === ""){
                    return res.status(400).json({err: true , message: '🦔 profile Pic is required'})
                }
    
                if(user.username !== username){
                    const TEMP_USER = await User.findOne({username: username});
                    if(TEMP_USER){
                        return res.status(200).json({err: true , message: '🦔 Username already exists'})
                    }
                    user.username = username;
                }

                user.name = name;
                user.bio = bio;
                user.website = website;
                user.username = username;
    
                //store profile picture and cover picture
                try 
                {

                    //saving the cover image

                    if(coverImage.includes('/storage/cover/')){
                        console.log(true);
                        user.coverImage = coverImage;
                    }
                    else
                    {

                        const coverImgBuffer = Buffer.from(
                            coverImage.replace(/^data:image\/(png|jpg|gif|jpeg);base64,/, ''),
                            'base64'
                        );

                        const coverImgPath = `${Date.now()}-${Math.round(
                            Math.random() * 1e9
                        )}.png`;

                        if(fs.existsSync(path.resolve(__dirname, `../storage/profile/${user.pfp}`))){
                            fs.unlinkSync(path.join(__dirname, `..${user.coverImage}`));
                        }
                    
                        const savepath = path.join(__dirname, `../storage/cover/${coverImgPath}`);
                        fs.writeFileSync(savepath, coverImgBuffer);
                        user.coverImage = `/storage/cover/${coverImgPath}`;
                    }


                    if(pfp.includes('/storage/profile/')){
                        user.pfp = pfp;
                    }
                    else
                    {

                    const pfpBuffer = Buffer.from(
                        pfp.replace(/^data:image\/(png|jpg|gif|jpeg);base64,/, ''),
                        'base64'
                    );

                    const pfpPath = `${Date.now()}-${Math.round(
                        Math.random() * 1e9
                    )}.png`;
                        
                    //Resizing the profile picture and storing it in the server
                    if(fs.existsSync(path.resolve(__dirname, `../storage/profile/${user.pfp}`))){
                        console.log(true)
                        fs.unlinkSync(path.join(__dirname, `..${user.pfp}`));
                    }
                    
                    const jimResp = await jimp.read(pfpBuffer);
                    jimResp
                        .resize(150, jimp.AUTO)
                        .write(path.resolve(__dirname, `../storage/profile/${pfpPath}`));
                    user.pfp = `/storage/profile/${pfpPath}`;
                }
            }
            catch(err){
                console.log(err);
                return res.status(500).json({message: 'Img processing error'})
            }


            user.save();
            return res.status(200).json({err: false, message: 'User successfully updated 😃', user : new userDtos(user) });
        
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message: 'Server error'})
        }

    }

    async getAllUsers(req, res){
        try{
            const users = await User.find({}).where('activated').equals(true).where('_id').ne(req.user._id).limit(4);
            return res.status(200).json({err: false, message: 'Users successfully fetched', users: users.map(user => new userDtos(user)) });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message: 'Server error'})
        }
    }
    
    async getUserById(req, res){
        try{
            const user = await User.findById(req.params.id);
            return res.status(200).json({err: false, message: 'User successfully fetched', user: new userDtos(user) });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message: 'Server error'})
        }
    }

    async isFollowing(req, res){
        try{
            const user = await User.findById(req.user._id);
            const isFollowing = user.following.includes(req.params.id);
            return res.status(200).json({err: false, message: 'User successfully fetched', isFollowing: isFollowing });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message: 'Server error'})
        }
    }

    async followUnfollowUser(req, res){
        const onUser = req.params.id;
        try{
            const user = await User.findById(req.user._id)
            if(!user.following.includes(onUser)){
     
                const userToFollow = await User.findById(onUser);
                userToFollow.followers.push(req.user._id);
                user.following.push(onUser);
                userToFollow.save();
                user.save();
                return res.status(200).json({err: false, message: 'User successfully followed', success: true, following : true,  user: new userDtos(userToFollow)  });
            }
            if(user.following.includes(onUser)){
       
                const userToUnFollow = await User.findById(onUser);
                userToUnFollow.followers = userToUnFollow.followers.filter(follower => follower === req.user._id);
                user.following = user.following.filter(following => following === onUser);
                userToUnFollow.save();
                user.save();
                return res.status(200).json({err: false, message: 'User successfully unfollowed', success: true, following : false, user: new userDtos(userToUnFollow) });
            }
            
        }
        catch(err){
            console.log(err)
            return res.status(500).json({message: 'Server error', success: false});
        }
    }

}


module.exports = new UserController();