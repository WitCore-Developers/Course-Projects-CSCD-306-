const User = require("./models/User")
const bcrypt = require("bcrypt")
const LocalStrategy = require("passport-local")

module.exports = function(passport){
    // Local Strategy
    passport.use(new LocalStrategy(
        async (username, password, done) => {
          const user = await User.findOne({ email: username })
            if (!user) { 
                return done(null, false);
            }
    
            const passwordValid = await bcrypt.compare(password, user.password)
            if (!passwordValid) { 
                return done(null, false); 
            }
            return done(null, user);
        }
      ));
    
    passport.serializeUser((user, done)=>{
        done(null, user._id);
    })
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    })
  }