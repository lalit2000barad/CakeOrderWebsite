
const express = require("express");
const app = express();
let multer = require('multer')
const path = require("path");
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

require("./db/conn");
const Register = require("./models/register");
const NewCakes = require("./models/admin_page");

const { json } = require("express");

const port = process.env.port || 7000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

//Storage Setting
let storage = multer.diskStorage({
  destination: './public/uploads', //directory (folder) setting
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname) // file name setting
  }
})

//Upload Setting
let upload = multer({
  storage: storage
})

var imgModel = require('./models/admin_page');
const { fstat } = require("fs");

//home page
app.get("/", (req, res) => {
  res.render("Home");
});

//admin page
app.get("/admin_login", (req, res) => {
  res.render("admin_login");
})

//userlogin page
app.get("/Userlogin", (req, res) => {
  res.render("Userlogin");

})

//register page
app.get("/register", (req, res) => {
  res.render("register");

})

//admin page
app.get("/admin_page", (req, res) => {
  res.render("admin_page");
})

//cart page 2
app.get("/cart-2", (req, res) => {
  res.render("cart-2");
})

//add to cart page
app.get("/addcart", (req, res) => {
  res.render("addcart");
})

//cart pag 5
app.get("/cart-5", (req, res) => {
  res.render("cart-5");
})

//cart pag 6
app.get("/cart-6", (req, res) => {
  res.render("cart-6");
})

//cart pag 7
app.get("/cart-7", (req, res) => {
  res.render("cart-7");
})

//cart pag 8
app.get("/cart-8", (req, res) => {
  res.render("cart-8");
})
// app.get("/view-cart", (req, res) => {
//   res.render("view-cart");
// })

// app.get("/manageorder", (req, res) => {
//   res.render("manageorder");
// })



app.get('/placedorders', (req, res) => {
  res.render('placedorder');
});

app.post('/placedorders', (req, res) => {
 
  const Customer_Email = req.body.Customer_Email;
  client.connect(err => {
  const collection = client.db("test").collection("orders");
  //find method
  collection.find({Customer_Email: Customer_Email}).toArray(function(err, result) {
      res.render('table',{deviceData:result});
      client.close();
  });
  });
});

// const bcrypt = require('bcryptjs');

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const registeremployee = new Register({
        Name: req.body.Name,
        email: req.body.email,
        password: hashedPassword,
      });
      const registed = await registeremployee.save();
      res.status(201).render("Home");

    } else {
      res.send("invalid details")
    }

  } catch (error) {
    res.status(400).send(error);
  }
});


const bcrypt = require('bcryptjs');

app.post("/Userlogin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.psd;

    const user = await Register.findOne({ email: email });

    if (user) {
      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (passwordIsValid) {
        res.status(201).render("addcart")
      } else {
        res.send("invalid login details");
      }
    } else {
      res.status(400).send("invalid email")
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


const userOrders = new mongoose.Schema({
  CakeName: {
    type: String,
    // required: true
  },
  CakePrice: {
    type: String,
    //required: true
  },
  CakeQuantity: {
    type: String,
    //required: true
  },

  Customer_Name: {
    type: String,
    //required: true
  },

  Customer_Phoneno: {
    type: String,
   // required: true
  },
  
  Customer_Email: {
    type: String,
   // required: true
  },
  Customer_Address: {
    type: String,
   // required: true
  },
  Customer_custommsg: {
    type: String,
   // required: true
  },
  Customer_order_status:{

    type: String,
   // required: true
  },

})

//we need to create collections
const Orders = new mongoose.model("Orders", userOrders);

app.post("/addcart", upload.single('single_input'), (req, res, next) => {
  // req.file
  // NewCakes.create({Cake_Image:req.file.filename})
  try {
    const aname = "admin";
    const password = "admin";

    // const useremail = await  Register.findOne({email:email});

    if (aname === password) {
      //res.status(201).render("addcart")
      //console.log("ad");
      const custdetails = new Orders({
        CakeName: req.body.user_title,
        CakePrice: req.body.user_price,
        CakeQuantity: req.body.user_quantity,
        Customer_Name: req.body.yourname,
        Customer_Phoneno: req.body.phonumber,
        Customer_Email: req.body.email,
        Customer_Address: req.body.addressbar,
        Customer_custommsg: req.body.custonn,
        Customer_order_status:req.body.order_status
        //confirmpassword:cpassword
      })

      const added = custdetails.save();
      res.status(201).render("addcart");

    } else {
      res.send("invalid details");
    }
  }
  catch (error) {
    res.status(400).send(error);
  }

})

app.post("/admin_page", upload.single('single_input'), (req, res, next) => {
  // req.file
  // NewCakes.create({Cake_Image:req.file.filename})
  try {
    const aname = "admin";
    const password = "admin";

    // const useremail = await  Register.findOne({email:email});

    if (aname === password) {
      //res.status(201).render("addcart")
      //console.log("ad");
      const cdetails = new NewCakes({
        Cake_Name: req.body.c_name,
        Cake_description: req.body.cake_desc,
        Price: req.body.price,
        Flavour: req.body.flav,
        Weight: req.body.wght,
        Category: req.body.cake_category,
        Shopkeeper_Name: req.body.s_name,
        Shop_Name: req.body.shop_name,
        Shop_Mobile: req.body.s_mob,
        Cake_Image_Link: req.body.img_url
        //confirmpassword:cpassword
      })

      const added = cdetails.save();
      res.status(201).render("admin_page");

    } else {
      res.send("invalid details");
    }
  }
  catch (error) {
    res.status(400).send(error);
  }

})



// /////////////////////////////////////view-cart
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }));


// const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin:admin@cluster0.fit8mu3.mongodb.net/test", { useNewUrlParser: true });









////////////////manageorder////////////////////////////////////////////////////////
const OrderSchema = new mongoose.Schema({
  _id : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true
  },
  CakeName: String,
  CakePrice: Number,
  CakeQuantity: String,
  Customer_Name: String,
  Customer_Phoneno: String,
  Customer_Email: String,
  Customer_Address: String,
  Customer_custommsg: String,
  Customer_order_status: String
});
const Order = mongoose.model('Order', OrderSchema);

app.get('/manageorder', async (req, res) => {
  const orders = await Order.aggregate([
    {$project: {CakeName: 1, CakePrice: 1, CakeQuantity: 1, Customer_Name: 1, Customer_Phoneno: 1, Customer_Email:1, Customer_Address: 1, Customer_custommsg: 1,Customer_order_status: 1}}
  ]);
  res.render('manageorder', { orders });
});

app.get('/view-cart', async (req, res) => {
  const orders = await Order.aggregate([
    {$project: {CakeName: 1, CakePrice: 1, CakeQuantity: 1, Customer_Name: 1, Customer_Phoneno: 1, Customer_Email:1, Customer_Address: 1, Customer_custommsg: 1,Customer_order_status: 1}}
  ]);
  res.render('view-cart', { orders });
});


const { ObjectId } = require('mongodb');

app.delete('/manageorder', (req, res) => {
    const { _id } = req.body;
    const collection = client.db("test").collection("orders");
    collection.deleteOne({ _id: ObjectId(_id) }, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.send({ message: 'Record deleted successfully' });
    });
});

app.delete('/view-cart', (req, res) => {
  const { _id } = req.body;
  const collection = client.db("test").collection("orders");
  collection.deleteOne({ _id: ObjectId(_id) }, (err, result) => {
      if (err) {
          console.log(err);
          return res.status(500).send(err);
      }
      return res.send({ message: 'Record deleted successfully' });
  });
});





const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0.fit8mu3.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  // perform operations on the database here
  app.put('/manageorder', (req, res) => {
    const { _id, CakeName, CakePrice, CakeQuantity, Customer_Name, Customer_Phoneno, Customer_Email, Customer_Address, Customer_custommsg,Customer_order_status } = req.body;
    const collection = client.db("test").collection("orders");
    collection.updateOne({ _id: ObjectId(_id) }, { $set: { CakeName, CakePrice, CakeQuantity, Customer_Name, Customer_Phoneno, Customer_Email, Customer_Address, Customer_custommsg ,Customer_order_status} }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.send({ message: 'Record updated successfully' });
    });
  });

  app.put('/view-cart', (req, res) => {
    const { _id, CakeName, CakePrice, CakeQuantity, Customer_Name, Customer_Phoneno, Customer_Email, Customer_Address, Customer_custommsg,Customer_order_status } = req.body;
    const collection = client.db("test").collection("orders");
    collection.updateOne({ _id: ObjectId(_id) }, { $set: { CakeName, CakePrice, CakeQuantity, Customer_Name,  Customer_Phoneno,Customer_Email, Customer_Address, Customer_custommsg ,Customer_order_status} }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.send({ message: 'Record updated successfully' });
    });
  });


  
  app.put('/placedorders', (req, res) => {
    const { _id, CakeName, CakePrice, CakeQuantity, Customer_Name, Customer_Phoneno, Customer_Email, Customer_Address, Customer_custommsg,Customer_order_status } = req.body;
    const collection = client.db("test").collection("orders");
    collection.updateOne({ _id: ObjectId(_id) }, { $set: { CakeName, CakePrice, CakeQuantity, Customer_Name, Customer_Phoneno, Customer_Email, Customer_Address, Customer_custommsg ,Customer_order_status} }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.send({ message: 'Record updated successfully' });
    });
  });


});











app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
})