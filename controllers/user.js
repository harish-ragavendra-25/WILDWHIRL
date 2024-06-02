
module.exports.registerForm = (req,res) => {
    res.render("users/register");
}

module.exports.addRegisteredUser = async(req,res,next) => {
    try {
        const { email, username, password } = req.body;
        const user = new userModel({ email, username });
        const registeredUser = await userModel.register(user, password);
        req.login(registeredUser,(err) => {
            if(err) return next(err);
            req.flash("sucess", `Welcome to Wild Whirl....${username}`);
            res.redirect("/campgrounds");
        })
    } catch (error) {
        req.flash("error",error.message);
        res.redirect('/register');
    }
}

module.exports.renderLoginForm = (req,res) => {
    res.render('users/login');
}

module.exports.AuthenticateUser = (req,res) => {
    req.flash('sucess','Welcome back...');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next) => {
    req.logOut(function(err){
        if(err)
            {
                return next(err);
            }
        req.flash("sucess","Goodbye!!");
        res.redirect("/campgrounds");
    })
}