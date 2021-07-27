// back/src/db.js
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

import SQL from 'sql-template-strings';
const blogCRUD = async () => {
    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })



 // await db.run(`DROP TABLE SUBSCRIBE ;`);

 ///await db.run(`CREATE TABLE SUBSCRIBE (SubscId INTEGER PRIMARY KEY AUTOINCREMENT, UserId INTEGER NOT NULL UNIQUE , email TEXT NOT NULL UNIQUE  );`);

 /**
     * Create the table
     **/
    // await db.run(`CREATE TABLE commentsDate (comId INTEGER PRIMARY KEY AUTOINCREMENT, userID INTEGER,  blogId INTEGER, comment TEXT,dateCom DATE, FOREIGN KEY(blogId) REFERENCES blogs(blog_Id),  FOREIGN KEY(userID) REFERENCES users(userID));`);
    /**  
     * let's insert a bit of data in it. We're going to insert 10 users
     * We first create a "statement"
     **/

    const stmt = await db.prepare(`INSERT INTO SUBSCRIBE (UserId, email) VALUES (?, ?)`);
 let i = 0;

    while (i < 10) {
        //await stmt.run(`person ${i}`, `person${i}@server.com`,`person${i}@server.com`);
        await stmt.run(`userID${i}`, `blogId${i}`);
        i++
    }

    /** finally, we close the statement **/
   stmt.finalize();
    /**
     * Then, let's read this data and display it to make sure everything works
     **/
//     const rows = await db.all("SELECT blog_Id AS id, UserId, blogName, blogPics, blogtext FROM blogs");
//     rows.forEach(({ id, UserId, blogName, blogPics, blogtext }) => console.log(`[id:${id}] -${UserId}- ${blogName} - ${blogPics} - ${blogtext}`));

//  /**
//     * Create the table
//     **/
// await db.run(`CREATE TABLE users (userID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, email text NOT NULL UNIQUE,password TEXT,admin BOOLEAN,token TEXT);`);
//await db.run(`DROP TABLE users`);
//     /**
//     * let's insert a bit of data in it. We're going to insert
//     10 users
//     * We first create a "statement"
//     **/
//    const stmt = await db.prepare(`INSERT INTO users (name,email,password,admin) VALUES (?, ?,?,?)`);
//      let i = 0;
//      while(i<10){
//      await stmt.run(`person ${i}`,`person${i}@server.com`,`person${i}password`,`person${i}true`);
//      i++
//      }
//         /** finally, we close the statement **/
        // await stmt.finalize();
//     /**
//   * Then, let's read this data and display it to make sure
//   everything works
  

}



const userCRUD = async () => {
    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })
   
    const getcoms = async () => {
        let statement = `SELECT comId AS id,userID,blogId,comment,dateCom FROM commentsDate`
    
        try {
            const rows = await db.all(statement)
            if (!rows.length) throw new Error(`no rows found`);
            return rows;
        } catch (e) {
            throw new Error(`couldn't retrieve users: ` + e.message);
        }

    }



    //get info users
    const getInfo = async (orderBy) => {
        let statement = `SELECT userID AS id, name,password, email,admin,token FROM users`
        switch (orderBy) {
            case 'name': statement += ` ORDER BY name`; break;
            case 'email': statement += ` ORDER BY email`; break;
            default: break;
        }
        try {
            const rows = await db.all(statement)
            if (!rows.length) throw new Error(`no rows found`);
            return rows;
        } catch (e) {
            throw new Error(`couldn't retrieve users: ` + e.message);
        }

    }

 //create new cmnt

    const createcmnt = async (props) => {
       // if (!props || !props.name || !props.user || !props.cmnt) {
        //     throw new Error(`you must provide a name, an email and password`);
        // }
       
        const { userId, blogId, comment,dateCom } = props
        try{
        const result = await db.run(`INSERT INTO commentsDate (userId, blogId,comment,dateCom) VALUES (?,?,?,?)`, [userId, blogId, comment,dateCom])
        const id = result.lastID
        return (id)
        } catch (e) {
            throw new Error(`couldn't insert this combination: ` + e.message);
        }

    }


  //get cmnts by blogid and userId
  const getcomments = async (blogId) => {
    let statement = `SELECT comment from comments WHERE blogId="${blogId}" `


    const rows = await db.all(statement)

    if (rows.length>=1){
        return rows;
    }else return false;
   
}


 //delete cmt
 const deleteCmt = async (name) => {
    const result = await db.run(`DELETE FROM commentsdate WHERE comId = "${name}"`);
    try{
    if (result.stmt.changes === 0) {
        return false
    }
    return true
} catch (e) {
    throw new Error(`couldn't insert this combination: ` + e.message);
}

}


//get cmnts by name by cmt
const getname = async (blogId) => {
    let statement = `SELECT comId,name,comment,dateCom,userId from (SELECT comId,name,comment,blogId,dateCom,users.userId AS userId from commentsDate,users WHERE commentsDate.userId==users.userId) WHERE blogId=${blogId}`


    const rows = await db.all(statement)

    if (rows.length>=1){
        return rows;
    }else return false;
   
}

 
    //create new user
    const createUser = async (props) => {
        if (!props || !props.name || !props.email || !props.password) {
            throw new Error(`you must provide a name, an email and password`);
        }

        const { name, email, password } = props
        try{
        const result = await db.run(`INSERT INTO users (name, email,password) VALUES (?,?,?)`, [name, email, password])
        const id = result.lastID
        return id
        } catch (e) {
            throw new Error(`couldn't insert this combination: ` + e.message);
        }

    }

    //delete user
    const deleteUser = async (name) => {
        const result = await db.run(`DELETE FROM users WHERE name = "${name}"`);
        try{
        if (result.stmt.changes === 0) {
            return false
        }
        return true
    } catch (e) {
        throw new Error(`couldn't insert this combination: ` + e.message);
    }

    }

    //get user by id
    const getUser = async (names) => {
        let statement = `SELECT userID AS id, name, email,admin,token FROM users WHERE name="${names}"`


        const row = await db.all(statement)

        if (row.length==1){
            return true;
        }else return false;
       
    }

    //get admin by id
    const getAdmin = async (names) => {
        let statement = `SELECT userID AS id, name, email,admin,token FROM users WHERE userID="${names}" AND admin=true`


        const row = await db.all(statement)

        if (row.length==1){
            return true;
        }else return false;
       
    }


    //get user by id and email
    const getUserE = async (email) => {
        let statement = `SELECT userID AS id, name, email,admin,token FROM users WHERE email="${email}"`
  const row = await db.all(statement)
  if (row.length==1){
      return true;
  }else return false;
 
    }


    //update name, password  user by id
    const updateUser = async (nameo, props) => {
        const { name, password } = props;
        let stmt, params = [];
        if (name && password) {
            stmt = `UPDATE users SET password= ?, name= ? WHERE name = ?`
            params = [name, password, nameo];
        }
        else if (name && !password) {
            stmt = `UPDATE users SET name= ? WHERE name = ?`
            params = [name, nameo];
        }
        else if (password && !name) {
            stmt = `UPDATE users SET password= ? WHERE name = ?`
            params = [password, nameo];
        }
        try{
        const result = await db.run(stmt, params);
        console.log('inside update users', result);
        if (result.stmt.changes === 0) {
            return false
        }
        return true
    } catch (e) {
        throw new Error(`couldn't update the user ${nameo}: ` + e.message);
    }

    }

    // make the user admin
    const makeAdmin = async (nameo) => {
        let stmt, params = [];
        stmt = `UPDATE users SET admin = True WHERE name = ?`
        params = [nameo];
        try{
        const result = await db.run(stmt, params);
        if (result.stmt.changes === 0) {
            return false
        }
        return true
    } catch (e) {
        throw new Error(`couldn't update the user ${nameo}: ` + e.message);
    }

    }

  // make the user admin
  const unmakeAdmin = async (nameo) => {
    let stmt, params = [];
    stmt = `UPDATE users SET admin = false WHERE name = ?`
    params = [nameo];
    try{
    const result = await db.run(stmt, params);
    if (result.stmt.changes === 0) {
        return false
    }
    return true
} catch (e) {
    throw new Error(`couldn't update the user ${nameo}: ` + e.message);
}

}


//check username and password
const CHECK = async (username,password) => {
    let statement = `SELECT userID AS id FROM users WHERE name="${username}" and password="${password}"`
const row = await db.all(statement)
if (row.length==1){
  return true;
}else return false;

}

//get user by id
const get = async (id) => {
    let statement = `SELECT userID AS id,email FROM users WHERE userID="${id}"`
const row = await db.all(statement)
if (row.length==1){
  return row;
}else return false;

}

    //set login
    const setLogin = async (nameo) => {
        let stmt, params = [];
        stmt = `UPDATE users SET login_status= 'on' WHERE name = ?`
        params = [nameo];
        try{
        const result = await db.run(stmt, params);
        if (result.stmt.changes === 0) {
            return false
        }
        return true
    } catch (e) {
        throw new Error(`couldn't update the user ${nameo}: ` + e.message);
    }

    }


    const controller = {
        getInfo,
        createUser,
        deleteUser,
        getUser,
        getUserE,
        updateUser,
        makeAdmin,
        setLogin,
        getcoms,
        createcmnt,
        getcomments,
        getAdmin,
        getname,
        get,
        unmakeAdmin,

        deleteCmt,
                CHECK

    }
    
    return controller;

}

module.exports = { blogCRUD,userCRUD };



