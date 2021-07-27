// back/src/index.js

const app = require('./app');
const db = require('./db');
const SAdb = require('./SAdb');
const DAdb = require('./DAdb');
const MOdb = require('./MOdb');
const multer = require('multer');
const path = require("path");
//db.blogCRUD();
//MOdb.messagesfunc1();
const controllerr = require('./auth/controller');
const { log } = require('console');

const con = async () => {
    const controller = await controllerr.abc();
    app.post("/signup", async (req, res, next) => {
        const { username, email, pass0 } = req.body;
        console.log(req.body)
        try {
            const result = await controller.signupAction({ username, email, pass0 });
            console.log(result)
            res.json({ success: true, result });
        } catch (e) {
            next(e);
            console.log(e)
        }
    });

    app.post("/login", async (req, res, next) => {
        const { name, password } = req.body;
        console.log(req.body)
        try {
            const result = await controller.loginAction({ name, password });
            console.log(result)
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    app.post("/logout", controller.isLoggedIn, async (req, res, next) => {
        const userId = req.userId;
        
        try {
            const result = await controller.logoutAction(userId);
            
            res.json({ success: true, result });
            console.log(result);
        } catch (e) {
            next(e);
        }
    });

    app.get("/getUserData", controller.isLoggedIn, async (req, res, next) => {
        try {
            res.json({ success: true, result: req.user });
        
        } catch (e) {
            next(e);
        }
    });
}

const comCRUD = async () => {

    const controller = await db.comCRUD();
  

}

const upload = async () => {

    const controller = await SAdb.blogCRUD();

    const multerStorage = multer.diskStorage({
        destination: path.join(__dirname, '../public/images'),
        filename: (req, file, cb) => {
            const { fieldname, originalname } = file;
            const date = Date.now();
            // filename will be: image-1345923023436343-filename.png
            const filename = `${fieldname}-${date}-${originalname}`;
            cb(null, filename);
        }
    })

    const upload = multer({ storage: multerStorage })


    app.get('/', (req, res) => res.send("ok"));


    // CREATE image
    app.post('/blog/create/img', upload.single('img'), async (req, res, next) => {
        const {blogName, blogtext } = req.query;
        const blogPics = req.file && req.file.filename;
        try {
            const result = await controller.createblogimg({blogName, blogtext, blogPics });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    })

}

//MOdb.messagesfunc1();
//db.blogCRUD();
const deletee = async () => {
    const controller = await SAdb.blogCRUD();
    for (let i = 24; i < 27; i++) {
        await controller.deleteblog(i);
    }
}
const blog = async () => {
    const controller = await SAdb.blogCRUD();
    //controller.createblogimg({ UserId:'88888', blogName:'ddsz', blogPics:'fhfgvc', blogtext:'hgjgh' });
    //controller.createblog({ UserId:'111111', blogName:'wqwqwqpoijhgfww', blogPics:'qwqwpoijhgcqwq', blogtext:'asasjhgc2352' })
    //get info blogs

    app.get('/blogs', async (req, res) => {
        const { orderBy } = req.query
        const blogs = await controller.getblogList(orderBy);
        res.json({ success: true, result: blogs });

    });


    //get one blog by id
    app.get('/blogs/:id', async (req, res) => {
        const { id } = req.params
        const user = await controller.getblog(id);
        res.json({ result: user })
    });




    //delete blog by id
    app.get('/blogs/delete/:nameo', async (req, res) => {
        const { nameo } = req.params;
      let result=  await controller.deleteblog(nameo);
        res.send(result)
    });

    //create
    app.get('/blog/create', async (req, res, next) => {
        try {

            const { UserId, blogName, blogPics, blogtext } = req.query;
            const result = await controller.createblog({ UserId, blogName, blogPics, blogtext })
            res.json({ success: true, result });

        } catch (e) { next(e); }

    });
    // UPDATE
    app.get('/blog/update/:id', async (req, res, next) => {
        const { id } = req.params
        const { blogName, blogPics, blogtext } = req.query
        const result = await controller.updateblog(id, {blogName, blogPics, blogtext })
        res.json({ success: true, result })
    })
 //await controller.updateblog(28, {blogName:'car99999'})

}
const user = async () => {



    const controller = await db.userCRUD();


  ////
    //require('./auth/routes')(app, controller);
    //get info cmt
    app.get('/coms', async (req, res) => {
        const { orderBy } = req.query
        const users = await controller.getcoms(orderBy);
        res.json(users)
    });


      // DELETE
      app.get('/commtt/delete/:id', async (req, res, next) => {
        const { id } = req.params
        const result = await controller.deleteCmt(id)
        res.json({ success: true, result })
    });

    //await controller.createcmnt({ userId:'4623', blogId:'352', comment:'sdfadg',dateCom:'afsada' });
    //create a new cmt
    app.get('/comt/create', async (req, res, next) => {
        try {

            const { userId, blogId, comment,dateCom } = req.query;
            const result = await controller.createcmnt({ userId, blogId, comment,dateCom })
            res.json({ success: true, result });

        } catch (e) { next(e); }

    });

// cmnt by id
    app.get('/com/:blogId', async (req, res) => {

        const { blogId } = req.params
        const result = await controller.getcomments(blogId);
        res.json(result );

    });


    // nameeeee and comment
    app.get('/comname/:blogId', async (req, res) => {
        const { blogId } = req.params
        try{
        const result = await controller.getname(blogId);
        res.json(result );
        }catch(e){
            next(e);
        }

    });



    ////
    //require('./auth/routes')(app, controller);
    //get info users
    app.get('/users', async (req, res) => {
        const { orderBy } = req.query
        const users = await controller.getInfo(orderBy);
        res.json(users)
    });

    //get one user by id
    app.get('/user/usernameuser/:id', async (req, res) => {
        const { id } = req.params
        const result = await controller.getUser(id);
        res.json({ success: true, result });

    });

    //get one user and email
    app.get('/user/emailuserr/:email', async (req, res) => {
        const { email } = req.params
        const result = await controller.getUserE(email);
        res.json({ success: true, result });

    });
      //get user by email
      app.get('/user/get/:email', async (req, res) => {
        const { email } = req.params
        const result = await controller.get(email);
        res.json({ success: true, result });

    });

      //get one user and email
      app.get('/user/isAdmin/:email', async (req, res) => {
        const { email } = req.params
        const result = await controller.getAdmin(email);
        res.json({ success: true, result });

    });

    //delete user by id
    app.get('/users/delete/:nameo', async (req, res) => {
        const { nameo } = req.params
        await controller.deleteUser(nameo);
        const result = await controller.deleteUser(nameo);
        res.json({ success: true, result });
    });

    //check usernmae and password
    app.get('/user/check/:username/:password', async (req, res) => {
        const { username, password } = req.params
        const result = await controller.CHECK(username, password);
        res.json({ success: true, result });

    });
    // await controller.createUser({ name:'fassa', email:'dasd', password:'asdas' })
    //create a new user
    app.get('/users/create', async (req, res, next) => {
        try {

            const { name, email, password } = req.query;
            const result = await controller.createUser({ name, email, password })
            res.json({ success: true, result });

        } catch (e) { next(e); }

    });

    //update user by id
    app.get('/users/update', async (req, res, next) => {

        const { nameo, name, password } = req.query;
        try {
            const result = await controller.updateUser(nameo, { name, password })
            res.json({ success: true, result })
        } catch (e) { next(e); }
    });

    //make the user as admin
    app.get('/users/makeAdmin/:nameo', async (req, res, next) => {
        const { nameo } = req.params;
        try {
            const result = await controller.makeAdmin(nameo);
            res.json({ success: true, result })
        } catch (e) { next(e); }
    });

        //unmake the user as admin
        app.get('/users/unmakeAdmin/:nameo', async (req, res, next) => {
            const { nameo } = req.params;
            try {
                const result = await controller.unmakeAdmin(nameo);
                res.json({ success: true, result })
            } catch (e) { next(e); }
        });

    // set loginStatus as true
    app.get('/users/setLogin/:nameo', async (req, res, next) => {

        const { nameo } = req.params;
        try {
            const result = await controller.setLogin(nameo);
            res.json({ success: true, result })
        } catch (e) { next(e); }
    });



    app.use((err, req, res, next) => {
        res.status(500).json({ success: false, message: err.message });
    })


}
//db.createDataBase();
const subscribe = async () => {
    const controller = await DAdb.subscribeCRUD();

    //get subscribe
    app.get('/subscribe', async (req, res) => {

        const sub = await controller.getsubscribeCRUD();
        res.json(sub);
    });

    // DELETE
    app.get('/subscribe/delete/:id', async (req, res, next) => {
        const { id } = req.params
        const result = await controller.deletesubscribe(id)
        res.json({ success: true, result })
    });
    // CREATE
    app.get('/Subscribe/create', async (req, res, next) => {
        const { UserId,email} = req.query;
        const result = await controller.createsubscribe({ UserId,email });
        res.json({ success: true, result });
    })


}

const messages = async () => {

    const controller = await MOdb.messagesfunc();
    // app.get( '/', (req, res) => res.send("ok") );






    app.get('/messages', async (req, res) => {

        // const messages= await controller.getInfo();
        // res.json(messages);

        const result = await controller.getInfo();
        res.json({ success: true, result });

    });

    app.get('/mes/:name', async (req, res) => {
        const { name } = req.params
        const result = await controller.getMessage(name);
        res.json({ success: true, result });

    });

    //get one user and email
    app.get('/user/emailuser/:email', async (req, res) => {
        const { email } = req.params
        const result = await controller.getMessage_E(email);
        res.json({ success: true, result });

    });

   // uerid=fvadrv&name=hi&email=wfwwvw&messageContent=wvvwrdv&mesgTitle=wvvw&hearing=EWFWe&department=ewfEDF

  //controller.InsertMessage({UserId:'safeaf',name:'asfaf', email:'afSFae',messageContent:'afSefaes', mesgTitle:'aesfqas',hearing:'efqwf',department:'efewf'  })
    app.get('/meage/inesrt', async (req, res, next) => {
        try {
    
            const {UserId,name, email,messageContent, mesgTitle,hearing,department} = req.query;
            console.log(req.query);
           
            const result = await controller.InsertMessage({UserId,name, email,messageContent, mesgTitle,hearing,department} )
            console.log(result);
            res.json({ success: true, result });
    
        } catch (e) { next(e); }
    
    });
     //controller.deleteMessage(8); mtl ka2an ktabta bl URL

    app.get('/messages/delete/:id', async (req, res) => {

        const { id } = req.params;
        console.log(req.params)
        await controller.deleteMessage(id);
        const result = await controller.deleteMessage();
        res.json({ success: true, result });

    });





    app.use((err, req, res, next) => {
        res.status(500).json({ success: false, message: err.message });
    });




}

con();
messages();
blog();
user();
subscribe();
upload();

app.get('/', (req, res) => res.send('ok'));
app.listen(8000, () => console.log('server listening on port 8000'));

