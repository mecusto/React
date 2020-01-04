import  express from "express";
const app = express();
import  jwt from "jsonwebtoken";
import mysql from "mysql";
import cors from "cors";
import { ParamsDictionary } from "express-serve-static-core";

interface IPayload {
    username: string;
    email: string;
    isAdmin: boolean;
}
interface IBook {
    book_code: number;
    title: string;
    first_name: string;
    last_name: string;
    year_written: number;
    price: number;
}
interface IUser {
    id: number;
    username:string;
    email:string;
    isAdmin: boolean;
}

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "books"
});
const myprivatekey = "myprivatekey";



connection.connect(console.log("conectado a la db"));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/books", (_req,res) => {
    connection.query("SELECT title, year_written, concat(first_name, ' ', last_name) AS author FROM book;",
    (err, results: IBook[]) => {
        if (err) {
            return res.send(err);
        }
        res.send({ results });
    })
 
})

app.get("/books/:book_code", (req,res) => {
    const { book_code } = req.params;  
        connection.query(`SELECT * FROM book WHERE book_code = '${book_code}';`,
        (err, results: IBook[]) => {
            if (err) {
                console.log(err);
                return res.sendStatus(404); 
            }
            if (results && results.length > 0) {               
                res.send(results[0]);
            }else {
                res.send("No hay resultados")
            }
        })
})

//el tipo de datos correcto se gestionaría desde frontend
//interpreto que para modificar, agregar o borrar libros hay que ser adm
app.post("/books", (req,res) => {
    const { title, year_written, first_name, last_name, price } = req.body;
    const token = req.headers.authorization.replace("Bearer ","");
    const { isAdmin } = jwt.verify(token, myprivatekey) as IPayload;
    if (isAdmin === true){
        connection.query(
            `INSERT INTO book (title, year_written, first_name, last_name, price)
        SELECT * FROM ( SELECT '${title}', '${year_written}', '${first_name}',
         '${last_name}', '${price}) AS tmp 
        WHERE NOT EXISTS (SELECT title FROM book WHERE title = '${title}');`,
        (err, _results) => {
            if (err) return res.sendStatus(400);        
                connection.query(
                    `SELECT * FROM book WHERE title = '${title}' AND last_name = '${last_name}';`,
            (err,resu: IBook) => {
                if (err) return res.sendStatus(400);
                res.send({ resu });            
            })
        })
    }else{
        res.send("Usuario no autorizado");
    }
})


app.put('/books/:book_code', (req,res)=> {
    const { book_code } = req.params;
    const { title, year_written, first_name, last_name, price } = req.body;

    connection.query(`UPDATE book SET title = '${title}', year_written = '${year_written}',
     first_name = '${first_name}', last_name = '${last_name}', price = '${price}'
      WHERE book_code = '${book_code}';`,
      (err, results) => {
        if (err) {  
            res.sendStatus(400);
            console.log(err);
          } else{
              console.log(results);
                connection.query(
                    `SELECT * FROM book WHERE title = '${title}' AND last_name = '${last_name}';`,
                (err,resu: IBook) => {
                    if (err) return res.sendStatus(400);
                    res.send({ resu });
            })
          } 
      })      
})

  
  app.get("/users", (req, res) => {
      try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const { isAdmin } = jwt.verify(token, myprivatekey) as IPayload;
        connection.query(
          `SELECT id_users, username, email${isAdmin ? ", isAdmin" : ""} FROM users;`,
          (err, results: IUser[]) => {
            if (err) console.log(err);
            console.log(results);
            res.send(
              isAdmin
                ? results.map(user => ({ ...user, isAdmin: Boolean(user.isAdmin) }))
                : results
            );
          }
        );
      } catch {
        res.sendStatus(401);
      }
    });


interface IResponse{
    token: string;
}
interface IReqBody{
    username:string;
    password:string;
}   

app.post<ParamsDictionary, IResponse, IReqBody>('/auth', (req,res) => {
    const { username, password } = req.body;

    try{
        connection.query(`SELECT * FROM users WHERE username = '${username}' 
        AND password = sha1('${password}');`, (err,results: IUser[]) => {
            if (err) return err;
            if (results && results.length){ //si existe usuario en la db
                const [{ email, isAdmin }] = results;
                const payload: IPayload = {
                    username, 
                    isAdmin: Boolean(isAdmin),
                    email
                };   
                const token = jwt.sign(payload, myprivatekey);
                res.send({ token });
            }
            else{
                res.sendStatus(401);
            }
        })
    }catch{
        res.sendStatus(500);
    }

})


/*End points para usuario, requiere autentificación*/

app.get('/users/:userId/books', (req,res) => {
    const { userId } = req.params;
    console.log(userId);
    const token = req.headers.authorization.replace("Bearer ","");
    console.log('token' + token);
    jwt.verify(token, myprivatekey);

    connection.query(`SELECT * FROM book 
        LEFT JOIN users_book ON book.book_code = users_book.book_code
        WHERE users_book.id_users ='${userId}';`,
        (err,results: IBook) => {
            if (err) return res.sendStatus(401);
            console.log(results)
            res.send(results);
    })
})

app.post('/users/:userId/books/:book_code', (req,res) => {
    const { userId, book_code } = req.params;
    const token = req.headers.authorization.replace("Bearer ","");
    jwt.verify(token, myprivatekey);

    connection.query(`INSERT INTO users_book (id_users, book_code)
            SELECT * FROM (SELECT '${userId}', '${book_code}') AS tmp 
            WHERE NOT EXISTS (SELECT book_code FROM users_book 
            WHERE book_code = '${book_code}' AND id_users = '${userId}')`,
         (err,results) => {
            if (err) {  
                res.sendStatus(401);
                console.log(err);
              } else{
                connection.query(`SELECT * FROM book 
                LEFT JOIN users_book ON book.book_code = users_book.book_code
                WHERE users_book.id_users ='${userId}';`,
                (err,results) => {
                    if (err) return res.sendStatus(401);
                    res.send(results);
            })
              }
        })
})


app.delete('/users/:userId/books/:book_code', (req,res) => {
    const { userId, book_code } = req.params;
    const token = req.headers.authorization.replace("Bearer ","");
    jwt.verify(token, myprivatekey);
    connection.query(`DELETE FROM users_book WHERE book_code = '${book_code}'
     AND id_users = '${userId}';`, (err,results) => {
        if (err) return res.sendStatus(401);
        res.send(results);
     })
})  

app.listen(3000);