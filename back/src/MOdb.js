const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
import SQL from 'sql-template-strings';

// const messagesfunc1 = async () => {
//     const db = await sqlite.open({
//         filename: 'db.sqlite',
//         driver: sqlite3.Database
//     })
//  /**
//      * Create the table
//      **/ 
//     // await db.run('DROP TABLE messages; ');
//     //    await db.run(`CREATE TABLE messages (message_Id INTEGER PRIMARY KEY AUTOINCREMENT, UserId INTEGER NOT NULL UNIQUE, email text NOT NULL UNIQUE , name text NOT NULL UNIQUE ,mesgTitle TEXT NOT NULL,  messageContent text NOT NULL , hearing text NOT NULL ,department text NOT NULL );`);
//     /**  
//      * let's insert a bit of data in it. We're going to insert 10 messages
//      * We first create a "statement"
//      **/

//     const stmt = await db.prepare(`INSERT INTO messages (UserId, email, mesgTitle, messageContent,name,hearing,department) VALUES (?, ?, ?, ?, ? , ? , ?)`);
//     let i = 0;

//     while (i < 10) {
//         //await stmt.run(`person ${i}`, `person${i}@server.com`);
//         await stmt.run(`UserId${i}`, `email${i}@gmail.com`, `mesgTitle${i}`, `messageContent${i}`,`name${i}`,`hearing${i}`,`department${i}`);
//         i++
//     }

//     /** finally, we close the statement **/
//     await stmt.finalize();

//     /**
//      * Then, let's read this data and display it to make sure everything works
//      **/
//     const rows = await db.all("SELECT message_Id AS id, UserId, mesgTitle, email, messageContent , name , hearing , department  FROM messages");
//     rows.forEach(({ id, UserId, mesgTitle, email, messageContent ,name,hearing,department}) => console.log(`[id:${id}] -${UserId}- ${mesgTitle} - ${email} - ${messageContent}-${name}-${hearing}-${department}`));

// }



const  messagesfunc = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    });

    //get messages info in detail

    const getInfo = async (orderBy) => {
        let statement = `SELECT message_Id AS id, mesgTitle, email, messageContent , name , hearing , department  FROM messages`
        switch (orderBy) {
            case 'mesgTitle': statement += ` ORDER BY name`; break;
            case 'email': statement += ` ORDER BY email`; break;
            default: break;
        }
        try {
            const rows = await db.all(statement)
            if (!rows.length) throw new Error(`no rows found`);
            return rows;
        } catch (e) {
            throw new Error(`couldn't find any message: ` + e.message);
        }

    }

  


  // get messages by name 

    const getMessage = async (name) => {
        let statement = `SELECT message_Id AS id, mesgTitle, email, mesgTitle, messageContent,name,hearing,department  FROM messages  WHERE message_Id="${name}" `
        const row = await db.all(statement)
        if (row.length==1){
           return row;
        }else return false;
       
    }


    //get messages by email
    const getMessage_E = async (email) => {
        
        let statement = `SELECT message_Id AS id, mesgTitle, email, messageContent , name , hearing , department   FROM messages WHERE email="${email}"`
        const row = await db.all(statement)
      
        if (row.length==1){
          return true;
         }else return false;
 
    }
   
   
    const deleteMessage = async (id) => {
        const result = await db.run(`DELETE FROM messages WHERE message_Id= ?`, id);
        try{
        if (result.stmt.changes === 0) {
            return false
        }
        return true
       } catch (e) {
        throw new Error(`couldn't delete  this message: ` + e.message);
        }
    }

   
   

    const InsertMessage = async (props) => {
        if (!props || !props.UserId || !props.name || !props.email || !props.mesgTitle || !props.messageContent|| !props.hearing || !props.department ) {
            throw new Error(`you must provide all Informations`);
        }

        const {UserId,name, email,messageContent, mesgTitle,hearing,department }= props;
        try{
        const result = await db.run(`INSERT INTO messages (UserId,name, email,messageContent, mesgTitle,hearing,department) VALUES (?,?, ? , ? , ? , ? , ?)`, [UserId,name, email,messageContent, mesgTitle,hearing,department])
        const id = result.stmt.lastID
        return id
        } catch (e) {
            throw new Error(`couldn't insert this combination:` + e.message);
        }

    }



    
    const controller = {
        getInfo,
        deleteMessage,
        InsertMessage,
        getMessage,
        getMessage_E
        
    }
    
    return controller;


}


module.exports = {messagesfunc};