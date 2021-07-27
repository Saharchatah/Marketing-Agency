const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

const abc = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })

    const isLoggedIn = async (req, res, next) => {

        const id = req.header("id");
        const token = req.header("token");
       // console.log({id,token});
        if (!token) next(new Error("Auth Error"));

        try {

            const decoded = jwt.verify(token, "randomString");
           // console.log(decoded);
            if (id != decoded.userId) next(new Error("Invalid Token"));
       
            const statement = `SELECT userID AS id,name,email,admin,token FROM users WHERE token="${token}"`;
            const user = await db.get(statement);
            console.log(user);
            if (!user || !user.id || user.id != id) next(new Error("Invalid Token"));

            req.userId = decoded.userId;

            req.user = user;
           // console.log(user);

            next();

        } catch (e) {
            next(new Error("Invalid Token"));
        }

    }

    const signupAction = async ({ username, email, pass0 }) => {
        // check body data
        if (!email || !pass0) throw new Error("Email and password are required");
        try {
            // check if user already exists or not
            let selectStmt = `SELECT userID AS id, name, email, password FROM users WHERE name = "${username}"`;
            let user = await db.get(selectStmt);
            if (user) throw new Error("User already exists");

            // hash password
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(pass0, salt);

            let insertStmt = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            let result = await db.run(insertStmt, [username, email, hashedPassword]);
            let id = result && result.lastID;

            // generate token
            let payload = { userId: id };
            let token = jwt.sign(payload, "randomString", { expiresIn: 10000 });

            // add token to the user
            await db.run('UPDATE users SET token = ? WHERE userID = ?', token, id);

            return { id, token, username, email };
        } catch (e) {
            throw new Error(`couldn't create user ` + e.message);
        }
    }

    const loginAction = async ({ name, password }) => {
        // check body data
        if (!name || !password) throw new Error("Email and password are required");
        try {
            // get user
            let statement = `SELECT userID AS id, name, email, password FROM users WHERE name = "${name}"`;
            let user = await db.get(statement);
            if (!user) throw new Error("User not found");

            // check the password
            let isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Incorrect Password !");

            // generate token
            let payload = { userId: user.id };
            let token = jwt.sign(payload, "randomString", { expiresIn: 10000 });

            // add token to the user
            await db.run('UPDATE users SET token = ? WHERE userID = ?', token, user.id);

            return { ...user, token };
        } catch (e) {
            throw new Error(`couldn't login user ` + e.message);
        }
    }

    const logoutAction = async (userId) => {
        try {
            // remove token for user record
            await db.run('UPDATE users SET token = ? WHERE userID = ?', null, userId);
            return { message: "logged out successfully" }
        } catch (e) {
            throw new Error(`couldn't logout user ` + e.message);
        }
    }
    
    const controller = {
        isLoggedIn, signupAction, loginAction, logoutAction
    }
    
    return controller;

}
module.exports = { abc };
