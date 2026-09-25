import express from "express";
import cors from "cors";
import userServices from "./services/user-services.js";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));
  
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

/*const users ={
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};*/

/*app.get("/", (req, res) =>{
  res.send("Hello World!");
});*/

/*app.get("/users", (req, res) =>{
  const name = req.query.name;
  if (name != undefined){
    let result = findUserByName(name);
    result ={ users_list: result };
    res.send(result);
  } else{
    res.send(users);
  }
});*/

/*const findUserByName = (name) =>{
  return users["users_list"].filter((user) => user["name"] === name);
};*/

/*const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) =>{
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined){
    res.status(404).send("Resource not found.");
  } else{
    res.send(result);
  }
});*/

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices.findUserById(id)
    .then((result) => {
      if (result === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error finding user.");
    });
});

//delete will follo wsimiilar pattern to find by user id
/*const deleteUserById = (id) =>{
  const index = users["users_list"].findIndex(
    (user) => user["id"] === id
  );

  if (index === -1){
    return undefined;
  }

  return users["users_list"].splice(index, 1)[0];
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deletedUser = deleteUserById(id);

  if (deletedUser === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});*/
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices.removeUser(id)
    .then((deletedUser) => {
      if (deletedUser === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error deleting user.");
    });
});

/*const addUser = (user)=>{
  users["users_list"].push(user);
  return user;
};*/

/*const addUser = (user) => {
  user.id = Math.random().toString(36).substring(2, 8);
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) =>{
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});*/

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userServices.addUser(userToAdd)
    .then((savedUser) => {
      res.status(201).send(savedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error adding user.");
    });
});

/*app.get("/users", (req, res) =>{
  const name = req.query.name;
  const job = req.query.job;

  let result = users["users_list"];

  if(name !== undefined){
    result = result.filter((user) => user.name === name);
  }
  if(job !== undefined){
    result = result.filter((user) => user.job === job);
  }
  res.send({ users_list: result });
});*/
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices.getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error getting users.");
    });
});

app.listen(port, () =>{
  console.log(`Example app listening at http://localhost:${port}`);
}
);