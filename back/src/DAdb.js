const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')




const subscribeCRUD = async () => {

    const db = await sqlite.open({
      filename: 'db.sqlite',
      driver: sqlite3.Database
    }); 
  
    const getsubscribeCRUD = async () => {
       let statement = `SELECT email FROM SUBSCRIBE`
     try{
           const rows = await db.all(statement)
           if (!rows.length) throw new Error(`no rows found`);
           return rows;
       } catch (e) {
           throw new Error(`couldn't retrieve users: ` + e.message);
       }
   }
  ////delete subscribe
  const deletesubscribe = async (id) => {
    try {
      const result = await db.run(`DELETE FROM SUBSCRIBE WHERE SubscId = ?`, id);
      if (result.changes === 0) throw new Error(`sub "${id}" does not exist`);
      return true;
      
    }catch(e){
      throw new Error(`couldn't delete the subscribe "${id}": ` + e.message);
  
    }
  }
  const createsubscribe = async (props) => {
  
    if (!props.UserId  ) {
        throw new Error(`add all the information`);
    }
  
    const { UserId,email} = props
    try {
        const result = await db.run(`INSERT INTO SUBSCRIBE (UserId,email) VALUES (?,?)`, [UserId,email]);
        const id = result.lastID
        return id;
    } catch (e) {
        throw new Error(`couldn't insert this combination: ` + e.message);
    }
  }
  
  
  
  
          const controller = {
        getsubscribeCRUD,
        deletesubscribe,
        createsubscribe
    }
        
          return controller;
  }
  module.exports = { subscribeCRUD };


