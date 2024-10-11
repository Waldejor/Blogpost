import express from "express";
import bodyParser from "body-parser";


import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


var isAuthenticated = false;
var blogPost = "";
var blogAction = "save";


const app = express();
const port = 3000;

var status = "notAuthenticated";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
 
    res.render("index.ejs");
  });

app.get("/edit", (req,res) => {
   
    blogPost = req.query.query;
    blogAction = "noaction";
    console.log(blogPost);
    res.render("editpage.ejs",{blogItem:blogPost,
                              blogTask:blogAction});
});

app.post("/handle", (req,res) => {
   blogAction = "";

  if (req.body["save"]) {
    blogAction = "saved";
  } else if(req.body["remove"]) {
    blogAction = "removed";
  } else if(req.body["publish"]) {
    blogAction = "published";
  } else {
    blogAction ="noaction";
  }
  console.log(blogAction);
  res.render("editpage.ejs",{blogItem:blogPost,
                             blogTask:blogAction
                             });
});

app.post("/submit", (req,res) => {
  console.log(req.body);
  var user = req.body.user;
  var password = req.body.password;
  var isAuthenticated = false;

  
  // Todo check credentials with database.

 
  switch (status) {

      case "notAuthenticated":
  
          if (user === "jornwa" && password == "erp") {
            isAuthenticated = true;
            status = "Authenticated";
            res.render("workpage.ejs",{user:req.body["user"]});

          } else {
          
          
              res.render("index.ejs", {auth:isAuthenticated,
                                    user:req.body["user"],
                                    password:req.body["password"]}
            );
            
        };

        break;
      case "Authenticated":
             //Logs out
             status = "notAuthenticated";
             res.render("index.ejs");
             break;
      default:
              break;
    
  }
});


  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  