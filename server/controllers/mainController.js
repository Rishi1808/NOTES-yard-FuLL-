//get home page
exports.homepage = async (req, res) => {
    const locals = {
        title: "NodeJS NOTES",
        description: "Free NodeJS Notes App"
    }
    res.render("index", { locals, layout: "../views/layouts/front-page" }); // Render the 'index' view

};


//get about page
exports.about = async (req, res) => {
    const locals = {
        title: "About",
        description: "About NodeJS NOTES"
    }
    res.render("about", locals); // Render the 'about' view
};