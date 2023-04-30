const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database("./src/db/database.db");

const app = express()
const port = 3004

app.use(cors({
  origin: '*'
}))

app.use(bodyParser.json());

database.serialize(() => {
  database.run("CREATE TABLE IF NOT EXISTS food (id INTEGER PRIMARY KEY, name varchar(255)NOT NULL,description varchar(255),image varchar(255),price REAL)");
  database.get("SELECT * FROM food", (err,data) =>{
    console.log(data);
    if(!data){
      database.run(`
  INSERT INTO food (
    name, description, image, price
  )
  VALUES
  ("Pizza","With delicious peperoni","https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/800px-Eq_it-na_pizza-margherita_sep2005_sml.jpg","30"),
  ("Pasta","Disgustingly scrumptious","https://realfood.tesco.com/media/images/1400x919-tomato-pasta-6a5a3c8e-f111-490d-805c-9b62fbec8691-0-1400x919.jpg","15"),
  ("Apple","Do not question his intentions","https://i.ytimg.com/vi/qH3SE3H0N0g/mqdefault.jpg","2.50")
   `);
    }
  })
});

// controlieris kurš atbild par to, kad tiks prasīts GET piepeasījums uz root, 
// jeb šajā gadījumā http://localhost:3004/
app.get('/', (req, res) => {
  //.get returns first element, .all returns all elements
  database.all(`SELECT * FROM food`,(err, all) => {
    res.json(all);
  })
})

//adding new data
app.post('/', (req, res) => {
  database.run(`
  INSERT INTO food (
    name, description, image,price
  )
  VALUES("${req.body.name}","${req.body.description}","${req.body.image}","${req.body.price}")
  `,(err, all) => {
  })
})

// controlieris kurš atbild par to, kad tiks prasīts GET piepeasījums uz root, 
// jeb šajā gadījumā http://localhost:3004/
app.get('/hello-world', (req, res) => {

  res.json({message: "hello back"});
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

