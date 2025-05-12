const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const OAuth2Strategy = require('passport-oauth2')
require ('dotenv').config()

const app = express()
app.use(bodyParser.json())

// Configure Oauth 2 strategy 
passport.use(
    new OAuth2Strategy(
        {
            authorizationURL : `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/authorize`,
            tokenURL : `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
            clientID : process.env.CLIENT_ID,
            clientSecret : process.env.CLIENT_SECRET,
            callbackURL : process.env.REDIRECT_URI
    
        },
        (accessToken, refreshToken, profile, done) => {
        try {
            const decodedToken = jwt.decode(accessToken)
            done(null, {accessToken, profile : decodedToken})
        }catch (err) {
            done(err)
        }
    })
)

passport.serializeUser((user,done) => done(null,user))
passport.deserializeUser((user,done) => done(null, user))

app.use(passport.initialize())

app.get('api/auth/callback', passport.authenticate('oauth2', { failureRedirect: '/login' }),
    (req,res) => {
        const token = req.user.accessToken
        res.json({message : 'Login Successful'}, token)
    }
)

app.get('/api/auth/protected', (req, res) => {
    const authHeader = req.headers.authorization
    if (!authHeader){
        return res.status(401).send('Unauthroized')
    }
    const token = authHeader.split(' ')[1]
    try {
        const decodeToken = jwt.decode(token)
        res.json({ message: 'Protected route accessed!', user: decodedToken });
    }
    catch (err){
        res.status(401).send('Invalid token');

    }

})

app.listen(5000, () => {
    console.log('Server running at http://localhost:5000')
})




