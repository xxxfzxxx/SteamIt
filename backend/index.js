const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
var db = mysql.createConnection({
    host: '35.184.167.82',
    user: 'root',
    password: '1234',
    database: 'steamit',
})
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/getadvance", (require, response) => {
    const sqlSelect = "Select t.tags , temp.gname as gname, temp.pr From (select distinct tags as tags from Users u where u.name is not null and u.name <> 'dup') as t, (Select g.tags as tags, g.GameName as gname, r.positive_ratings as pr From Game g join Ratings r using(appid) Where r.positive_ratings >100 and r. average_playtime > 50 Order by pr) as temp Where locate(t.tags, temp.tags) > 0 Limit 5";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

app.get("/api/get", (require, response) => {
    
    const sqlSelect = "select name, age, tags from Users where name is not null and name <> 'dup'";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(sqlSelect);
    });
});

app.get("/api/GameHistory", (require, response) => {
    const sqlSelect = "select distinct * from GameHistory where Game is not NULL";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(result);
    });
});
app.get("/api/TagHistory", (require, response) => {
    const sqlSelect = "select distinct * from TagHistory where Tag is not NULL";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(result);
    });
}); 
app.get("/api/AgeHistory", (require, response) => {
    const sqlSelect = "select distinct * from AgeHistory where Age is not NULL";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(result);
    });
}); 



app.post("/api/search", (require, response) => {
    
    const GameName = require.body.GameName;
    console.log(require.body);
    const sql1 = "insert into Users(game) values(?)";
    db.query(sql1, GameName, (err, result) => {
        console.log('success1');
    });

    const sqlSelect = "select GameName, platforms, developer, Price from Game where Game.GameName = ?";
    db.query(sqlSelect, GameName, (err, result) => {
        response.send(result);
        console.log(result);
        console.log(sqlSelect);
        console.log('success2');
    });
});
app.post("/api/sp", (require, response) => {

    const sqlInsert = "call searchHistory()";
    db.query(sqlInsert, (err, result) => {
        console.log("sp");
    })
});



app.post("/api/insert", (require, response) => {
    const name = require.body.name;
    const age = require.body.age;
    const tags = require.body.tags;

    const sqlInsert = "INSERT INTO Users (name, age, tags) VALUES (?,?,?)";
    db.query(sqlInsert, [name, age, tags], (err, result) => {
        console.log(err);
    })
});
// /:name
app.delete("/api/delete", (require, response) => {
    const name = require.body.name;
    const age = require.body.age;
    const tags = require.body.tag;
    console.log(tags);
    console.log(age);
    console.log(name);
    const sql1 = "insert into Users(age, tags) values(?, ?)"
    db.query(sql1, [age, tags], (err, result) => {
        if (err) 
        console.log(err);
    });
    const sqlDelete = "DELETE FROM Users WHERE name = ? and age = ?";
    db.query(sqlDelete, [name,age], (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.put("/api/update/", (require, response) => {
    const name = require.body.name;
    const tags = require.body.tags;
    const age = require.body.age;
    const oldtag = require.body.oldtag;
    const sql1 = "insert into Users(age, tags) values(?,?)";
    db.query(sql1, [age, oldtag], (err, result)=>{
        if(err)
        console.log(err);
    });

    const sqlUpdate = "UPDATE Users SET tags = ? WHERE name = ? and age = ?";
    db.query(sqlUpdate, [tags, name, age], (err, result) => {
        if (err) 
        console.log(err);
        console.log(sqlUpdate)
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})
// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const mysql = require("mysql");
// const cors = require("cors");

// var db = mysql.createConnection({
//     host:'35.184.167.82',
//     user: 'root',
//     password:'1234',
//     database:'steamit',
//    })

// // db.connect(function(err) {
// //     if (err) throw err;
// //     var sql = "INSERT INTO `movie_reviews` (`id`,`name`, `genres`) VALUES (5,'inception', 'good movie');";
// //     db.query(sql, function (err, result) {
// //       if (err) throw err;
// //       console.log(result.affectedRows + " record(s) updated");
// //     });
// //   });

// // app.get('/', (require, response) => {
// //     const sqlInsert = "INSERT INTO `movie_reviews` (`name`, `genres`) VALUES ('Spider2', 'good movie');";
// //     db.query(sqlInsert, (err, result) => {
// //         response.send("Hello world!!!");
// //     })
// // })

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// app.get("/api/get", (require, response) => {
//     const sqlSelect = "Select u.name, u.genres, temp.gname as gname From UsersDemo u, ((Select g.genres as genres, g.name as gname, g.Price as p From Game g Where g.Price < 100 Order by p Limit 5) Union (Select g.genres as genres, g.name as gname, r.positive_ratings as p from Game g join Ratings r using(appid) Where r.positive_ratings >100 and r. average_playtime > 50 Order by p)) as temp where u.genres = temp.genres limit 10;";
//     // const sqlSelect = "select * from UsersDemo";
//     db.query(sqlSelect, (err, result) => {
//         response.send(result);
//     });
// });

// app.post("/api/insert", (require, response) => {
//     const name = require.body.name;
//     const genres = require.body.genres;

//     const sqlInsert = "INSERT INTO UsersDemo (name, genres) VALUES (?,?)";
//     db.query(sqlInsert, [name, genres], (err, result) => {
//         console.log(err);
//     })
// });

// app.delete("/api/delete/:name", (require, response) => {
//     const name = require.params.name;

//     const sqlDelete = "DELETE FROM UsersDemo WHERE name= ?";
//     db.query(sqlDelete, name, (err, result) => {
//         if (err) 
//         console.log(err);
//     })
// });

// app.put("/api/update/", (require, response) => {
//     const name = require.body.name;
//     const genres = require.body.genres;

//     const sqlUpdate = "UPDATE UsersDemo SET genres = ? WHERE name= ?";
//     db.query(sqlUpdate, [genres,name ], (err, result) => {
//         if (err) 
//         console.log(err);
//     })
// });

// app.listen(3002, () => {
//     console.log("running on port 3002");
// })
