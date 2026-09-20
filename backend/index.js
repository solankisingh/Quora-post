const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));
app.use(express.static(path.join(__dirname , "/public")));
app.use(express.static("public"));
const port = 8080 ;
const {v4 : uuidv4} = require("uuid");

const methodOverride = require("method-override");
app.use(methodOverride("__method"));
// Data store array
let DB = [
    {
        // id : uuidv4(),
        id : "3a833f40-07ec-4425-86be-bb0318824169",
        user : "lakhwinder singh",
        content : "I live in india",
    }
];

app.get("/posts" , (req ,res)=>{
    console.log("request sended");
    // res.send("response recivied")
    console.log(DB);
    res.render("posts.ejs" , {DB});

})
// create
app.get("/posts/new" , (req , res)=>{
    console.log("request for new post sended");
    res.render("new.ejs");
})
app.post("/posts" , (req , res)=>{
    let {user , content} = req.body ;
    let id = uuidv4();
    DB.push({ id , user , content});
    res.redirect("/posts");
})

//show route
app.get("/posts/:id" , (req , res)=>{
    let {id} = req.params;
    let post = DB.find((p)=>id === p.id);
    // console.log(post);
    // res.send(`post found`);
    res.render("show.ejs" , {post});
})
//update
app.patch("/posts/:id" , (req , res)=>{
    let {id} = req.params ;
    let newContent = req.body.content ;
    let post = DB.find((p)=>id===p.id);
    // console.log(post);
    post.content = newContent ;
    res.redirect("/posts");
    // console.log(id);
    // res.send("request for update working");
})
app.get("/posts/:id/edit" , (req , res)=>{
    let {id} = req.params ;
    let post = DB.find((p)=>id===p.id);
    res.render("update.ejs" , {post});
})

//delete route
app.delete("/posts/:id" , (req , res)=>{
    let {id} = req.params ;
    DB = DB.filter((p)=>id !== p.id);
    res.redirect("/posts");
})
app.listen(port , ()=>{
    console.log(`app is listening at port ${port}`);
})
