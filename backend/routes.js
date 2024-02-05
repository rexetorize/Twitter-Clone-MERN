const router = require('express').Router();
const tweetController = require('./controllers/tweet-controller');
const SignInController = require('./controllers/signin-controller');
const passport = require('passport');
const upload = require('./middlewares/multerConfig');
const AuthVerification = require('./middlewares/auth-verification');
const UserController = require('./controllers/user-controller');
const UserDto = require('./dtos/userDtos');



router.get('/' , (req, res) => {
    res.send('Hello World');
});


// Google Auth
router.get('/auth/google', AuthVerification.ensureAuthenticated,  passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/redirect', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.redirect(process.env.FRONTEND_URL);
});

//Github Auth
router.get('/auth/github', AuthVerification.ensureAuthenticated, passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), function(req, res) {
    res.redirect(process.env.FRONTEND_URL);
});

//Email Auth
router.post('/auth/OTP', SignInController.getOTP);




router.get('/auth/verify', UserController.verifyAndSendUserData);

router.get('/auth/logout',AuthVerification.checkAuth, (req, res) => {
    req.logout();
    return res.status(200).json({isAuth: false});
});




//user routes
router.get('/user', AuthVerification.checkAuth, (req, res) => {
    res.json({user : new UserDto(req.user)});
});

router.post('/user/activate', AuthVerification.checkAuth, UserController.activate);

router.post('/tweet', AuthVerification.checkAuth, tweetController.saveTweet);
router.get('/tweet', AuthVerification.checkAuth, tweetController.getTweets);
router.get('/tweet/:id', AuthVerification.checkAuth, tweetController.getTweetById);
router.get('/alltweets',AuthVerification.checkAuth, tweetController.getAllTweets);
router.get("/tweet/user/:id", AuthVerification.checkAuth, tweetController.getTweetsByUserId);

router.post("/reply-tweet", AuthVerification.checkAuth, tweetController.replyTweet);
router.get('/get-replies/:id', AuthVerification.checkAuth, tweetController.getReplies);

router.get('/allusers',AuthVerification.checkAuth, UserController.getAllUsers);
router.get("/user/:id", AuthVerification.checkAuth, UserController.getUserById);

router.post('/update-profile', AuthVerification.checkAuth, UserController.updateProfile);

router.get('/follow-unfollow-toggle/:id', AuthVerification.checkAuth, UserController.followUnfollowUser);
router.get('/is-following/:id', AuthVerification.checkAuth, UserController.isFollowing);

router.get('/get-data/:id', AuthVerification.checkAuth, tweetController.getData);

router.get('/like-unlike-toggle/:id', AuthVerification.checkAuth, tweetController.likeUnlikeTweet);

router.get('/test-redirect', (req, res) => {
    res.redirect('/page');


})

router.get('/page', (req, res) => {
    res.json({message: 'Hello World'});
});

module.exports = router;