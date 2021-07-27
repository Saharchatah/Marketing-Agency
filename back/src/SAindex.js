const app =require('./app')
import db from './SAdb'

//const app= require('./app')
//const db= require('./db')


//db.test();

const start = async () => {
   
    const controller = await db.initializeDatabase();

    app.get('/', (req, res) => res.send("oknow"));

    //get all the blogs
    app.get('/blogs', async (req, res, next) => {
        const { orderBy } = req.query
        const blogs = await controller.getblogList(orderBy)
        res.json({ success: true, result: blogs })
    })

//create
    app.get('/blog/create', async (req, res, next) => {
        const { UserId, blogName, blogPics, blogtext } = req.query;
        const result = await controller.createblog({ UserId, blogName, blogPics, blogtext });
        res.json({ success: true, result });
    })

     // READ SINGLE
     app.get('/blog/:id', async (req, res, next) => {
        const { id } = req.params
        const blog = await controller.getblog(id)
        res.json({ success: true, result: blog })
    })

    // DELETE
    app.get('/blog/delete/:id', async (req, res, next) => {
        const { id } = req.params
        const result = await controller.deleteblog(id)
        res.json({ success: true, result })
    })

     // UPDATE
     app.get('/blog/update/:id', async (req, res, next) => {
        const { id } = req.params
        const { UserId, blogName, blogPics, blogtext } = req.query
        const result = await controller.updateblog(id, { UserId, blogName, blogPics, blogtext })
        res.json({ success: true, result })
    })

    app.use((err, req, res, next) => {
        console.error(err);
        const message = err.message;
        res.status(500).json({ success: false, message });
    })


  





// testing
   /* const id=3;
  const t=await controller.updateblog(id, {UserId:"6555"})
    console.log("my update" , t)*/

    //const t=await controller.updateblog(id, {UserId:"3", blogName:"sahar", blogPics:"nopicture",blogtext:"nananan"})

 
   /*const updated_blog = await controller.getblogList(id)
    console.log("------\nmy updated contact\n",updated_blog)
    const updated_blog = await controller.getblogList()
    console.log("------\nmy updated contact\n",updated_blog)*/
   
    /*const id = await controller.createblog({ UserId: "4123", blogName: "brad4@pet.com", blogPics: "mypicture", blogtext: "mytext" });
    console.log("------\my new blog\n",id)*/
/*const id =2;
    const blog = await controller.getblog(id)
    console.log("------\nmy my blog\n",blog)*/

   // console.log("------\nlist of my blogs\n",await controller.getblogList())

/*const id=7;
    console.log("------\nlist of contacts before\n",await controller.getblogList())
    await controller.deleteblog(id)
    console.log("------\nlist of contacts after deleting\n",await controller.getblogList())*/

}
start();

app.listen(9000, () => console.log('server listening on port 9000'));
// const { blogName, blogPics,blogtext } = props;
// let stmt, params = [];
// if (blogName && blogPics && blogtext) {
//     statement = `SELECT blog_Id AS id, blogName, blogPics, blogtext FROM blogs WHERE blog_Id=${id} `
//     params = [blogName, blogPics, blogtext];
// }
// else if (blogName && blogPics && !blogtext ) {
//     statement = `SELECT blog_Id AS id, blogName, blogPics FROM blogs WHERE blog_Id=${id} `
//     params = [blogName, blogPics];
// }
// else if (!blogName && blogPics && !blogtext) {
//     statement = `SELECT blog_Id AS id, blogName FROM blogs WHERE blog_Id=${id} `
//     params = [blogName];
// }else if (blogName && !blogPics && blogtext) {
//     statement = `SELECT blog_Id AS id, UserId, blogName,blogtext FROM blogs WHERE blog_Id=${id} `
//     params = [password, nameo];
// }else if (!blogName && !blogPics && blogtext) {
//     statement = `SELECT blog_Id AS id, blogtext FROM blogs WHERE blog_Id=${id} `
//     params = [blogtext];
// }