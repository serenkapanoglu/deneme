const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.SERVER_URL + '/auth/twitter/callback'
}, (token, tokenSecret, profile, done) => {
  console.log(profile);
  // Handle user profile data, store user in session, etc.
}));

  module.exports = twitterRoutes = (app) => {
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback',
      passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
};
