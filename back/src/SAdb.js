const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

const test = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })
    /**
     * Create the table
     **/
   // await db.run(`DROP TABLE blogs`);
     await db.run(`CREATE TABLE blogs (blog_Id INTEGER PRIMARY KEY AUTOINCREMENT, blogName TEXT , blogPics text, blogtext text );`);
    /**  
     * let's insert a bit of data in it. We're going to insert 10 users
     * We first create a "statement"
     **/
    //    const stmt = await db.prepare(`INSERT INTO contacts (name, email) VALUES (?, ?)`);
    const stmt = await db.prepare(`INSERT INTO blogs (blogName, blogPics, blogtext) VALUES (?, ?, ?)`);
    let i = 0;

    while (i < 10) {
        //await stmt.run(`person ${i}`, `person${i}@server.com`);
        await stmt.run(`blogName${i}`, `blogPics${i}`, `blogtext${i}`);
        i++
    }

    /** finally, we close the statement **/
    await stmt.finalize();

    /**
     * Then, let's read this data and display it to make sure everything works
     **/
    const rows = await db.all("SELECT blog_Id AS id, UserId, blogName, blogPics, blogtext FROM blogs");
    rows.forEach(({ id, UserId, blogName, blogPics, blogtext }) => console.log(`[id:${id}] -${UserId}- ${blogName} - ${blogPics} - ${blogtext}`));


}

const blogCRUD = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })

    /**
     * retrieves the contacts from the database
     */



    const getblogList = async (orderBy) => {
        //let returnString = ""
        let statement = `SELECT blog_Id AS id, blogName, blogPics, blogtext FROM blogs`
        switch (orderBy) {


            //case 'id': statement+= ` ORDER BY id`; break;
         
            case 'blogName': statement += ` ORDER BY blogName`; break;

            case 'blogPics': statement += ` ORDER BY blogPics`; break;
            case 'blogtext': statement += ` ORDER BY blogtext`; break;

            default: break;
        }try {
            const rows = await db.all(statement);
            if (!rows.length) {throw new Error(`no rows found`);}
            return rows;
        } catch (e) {
            throw new Error(`couldn't retrieve blogs: ` + e.message);
        }
    }




    const deleteblog = async (id) => {
        try {
            const result = await db.run(`DELETE FROM blogs WHERE blog_Id = ?`, id);
            if (result.changes === 0) throw new Error(`blog "${id}" does not exist`);
            return true;
        } catch (e) {
            throw new Error(`couldn't delete the blog "${id}": ` + e.message);
        }
    }




    const getblog = async (id) => {
        let statement = `SELECT blog_Id AS id, blogName, blogPics, blogtext FROM blogs WHERE blog_Id=${id} `

        const row = await db.get(statement)
        if (!row)
            throw new Error(`blog ${id} not found`);
        return row
    }


    //createblog
    const createblog = async (props) => {

        if (!props || !props.blogName || !props.blogPics || !props.blogtext) {
            throw new Error(`add all the information`);
        }

        const {blogName, blogPics, blogtext } = props;
        try {
            const result = await db.run(`INSERT INTO blogs (blogName, blogPics, blogtext) VALUES (?, ?, ?, ?)`, [UserId, blogName, blogPics, blogtext]);
            const id = result.lastID
            return id;
        } catch (e) {
            throw new Error(`couldn't insert this combination: ` + e.message);
        }
    }

    // createblog
    const createblogimg = async (props) => {
        if (!props || !props.blogName || !props.blogtext) {
            throw new Error(`add all the information`);
        }
        const {blogName, blogPics, blogtext  } = props;
        try {
            const result = await db.run(`INSERT INTO blogs (blogName,blogPics,blogtext) VALUES (?,?,?)`, [blogName, blogPics, blogtext]);
            const id = result.lastID
            return id;
        } catch (e) {
            throw new Error(`couldn't insert this combination: ` + e.message);
        }
    }


    const updateblog = async (id, props) => {

        if (!props && !(props.blogName && props.blogPics && props.blogtext)) {
            throw new Error(`you must provide the informations`);
        }
        const {  blogName, blogPics, blogtext } = props;
        let stmt, params = [];

        if (blogName && blogPics && blogtext) {
            stmt = `UPDATE blogs SET UserId = ?, blogName = ?, blogPics = ?, blogtext = ?  WHERE blog_Id = ?`;
            params = [UserId, blogName, blogPics, blogtext, id];
        }
        else if ( !blogName && !blogPics && !blogtext) {
            stmt = `UPDATE blogs SET UserId = ?  WHERE blog_Id = ?`;
            params = [UserId, id];
        }
        else if (blogName  && !blogPics && !blogtext) {
            stmt = `UPDATE blogs SET blogName = ? WHERE blog_Id = ?`;
            params = [blogName, id];

        } else if (blogPics && !blogName  && !blogtext) {
            stmt = `UPDATE blogs SET blogPics = ?  WHERE blog_Id = ?`;
            params = [blogPics, id];
        }
        else if (blogtext && !blogName && !blogPics) {
            stmt = `UPDATE blogs SET blogtext = ?  WHERE blog_Id = ?`;
            params = [blogtext, id];
        }

        try {
            const result = await db.run(stmt, ...params);
            if (result.changes === 0) throw new Error(`no changes were made`);
            return true;
        } catch (e) {
            throw new Error(`couldn't update the contact ${id}: ` + e.message);
        }
    }





    const controller = {
        getblogList,
        createblog,
        getblog,
        deleteblog,
        createblogimg,
        updateblog

    }

    return controller;
}



module.exports = { blogCRUD,test };