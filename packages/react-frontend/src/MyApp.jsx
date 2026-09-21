// src/MyApp.jsx
//import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });

    setCharacters(updated);
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => {
      console.log(error);
    });
}, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />

      <Form handleSubmit={updateList} />
    </div>
  );
}

function fetchUsers() {
  return fetch("http://localhost:8000/users");
  //return promise;
}
async function postUser(person) {
const promise = await fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  if (promise.status !== 201) {
    throw new Error("Failed to create user");
  }
  return promise.json();}

/*function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}*/

export default MyApp;