// app/routes.js
module.exports = function(app, passport) {
    // =====================================
    // HOME PAGE (with login links)
    // =====================================
    app.get('/', function(req,res){
        res.render('index.ejs'); // load the index.ejs file
    });

    // ======================================
    // LOGIN ================================
    // ======================================
    // show the login form
    app.get('/login', function(req,res){
        // render the page and pass in any flash data if exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // ==========================================
    // SIGNUP ===================================
    // ==========================================
    // show the sign up form
    app.get('/signup', function(req,res){
        // render the page and pass in any flash data if exists
        res.render('signup.ejs', {message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // ===============================================
    // PROFILE =======================================
    // ===============================================
    // we will want this to be protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req,res){
        res.render('profile.ejs',{
            user : req.user //get the user out of the session and pass to template
        });
    });

    // =================================================
    // LOG OUT ==========================================
    // =============================================
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    });

    // route middleware to make sure if a user is logged in
    function isLoggedIn(req,res, next){

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to home page
        res.redirect('/');
    }




}