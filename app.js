const express = require('express');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const userModel = require('./models/User');

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log(chalk.hex('#03befc').bold("~ Homepage loaded!"));
    res.render("index.ejs");
});

app.get('/read', async (req, res) => {
    const allUsers = await userModel.find();
    console.log(chalk.hex('#03befc').bold("~ Fetched all users!"));
    res.render("read.ejs", { users: allUsers });
});

app.post('/create', async (req, res) => {
    const { name, username, phone, email, imageURL } = req.body;
    const createdUser = await userModel.create({
        name: name,
        phone: phone,
        email: email,
        username: username,
        imageURL: imageURL
    });

    console.log(chalk.hex('#03befc').bold("~ Created a user!"));
    res.redirect("/read");
});

app.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await userModel.findOneAndDelete({ _id: id });

    console.log(chalk.hex('#03befc').bold("~ Deleted a user!"));
    res.redirect("/read");
});

app.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findOne({ _id: id });

    console.log(chalk.hex('#03befc').bold("~ Loaded edit page for a user!"));
    res.render("edit.ejs", { user });
});

app.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { imageURL, name, email, phone, username } = req.body;
    const updatedUser = await userModel.findOneAndUpdate({ _id: id }, { imageURL, name, phone, email, username }, { new: true });

    console.log(chalk.hex('#03befc').bold("~ Updated a user!"));
    res.redirect("/read");
});

app.listen(8080, () => {
    console.log(chalk.hex('#ffd000').underline.bold("--- SERVER RUNNING AT PORT 8080 ---"));
});