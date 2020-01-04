"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var app = express_1["default"]();
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mysql_1 = __importDefault(require("mysql"));
var cors_1 = __importDefault(require("cors"));
var connection = mysql_1["default"].createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "books"
});
var myprivatekey = "myprivatekey";
connection.connect(console.log("conectado a la db"));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded());
app.use(cors_1["default"]());
app.get("/books", function (_req, res) {
    connection.query("SELECT title, year_written, concat(first_name, ' ', last_name) AS author FROM book;", function (err, results) {
        if (err) {
            return res.send(err);
        }
        res.send({ results: results });
    });
});
app.get("/books/:book_code", function (req, res) {
    var book_code = req.params.book_code;
    connection.query("SELECT * FROM book WHERE book_code = '" + book_code + "';", function (err, results) {
        if (err) {
            console.log(err);
            return res.sendStatus(404);
        }
        if (results && results.length > 0) {
            res.send(results[0]);
        }
        else {
            res.send("No hay resultados");
        }
    });
});
//el tipo de datos correcto se gestionaría desde frontend
//interpreto que para modificar, agregar o borrar libros hay que ser adm
app.post("/books", function (req, res) {
    var _a = req.body, title = _a.title, year_written = _a.year_written, first_name = _a.first_name, last_name = _a.last_name, price = _a.price;
    var token = req.headers.authorization.replace("Bearer ", "");
    var isAdmin = jsonwebtoken_1["default"].verify(token, myprivatekey).isAdmin;
    if (isAdmin === true) {
        connection.query("INSERT INTO book (title, year_written, first_name, last_name, price)\n        SELECT * FROM ( SELECT '" + title + "', '" + year_written + "', '" + first_name + "',\n         '" + last_name + "', '" + price + ") AS tmp \n        WHERE NOT EXISTS (SELECT title FROM book WHERE title = '" + title + "');", function (err, _results) {
            if (err)
                return res.sendStatus(400);
            connection.query("SELECT * FROM book WHERE title = '" + title + "' AND last_name = '" + last_name + "';", function (err, resu) {
                if (err)
                    return res.sendStatus(400);
                res.send({ resu: resu });
            });
        });
    }
    else {
        res.send("Usuario no autorizado");
    }
});
app.put('/books/:book_code', function (req, res) {
    var book_code = req.params.book_code;
    var _a = req.body, title = _a.title, year_written = _a.year_written, first_name = _a.first_name, last_name = _a.last_name, price = _a.price;
    connection.query("UPDATE book SET title = '" + title + "', year_written = '" + year_written + "',\n     first_name = '" + first_name + "', last_name = '" + last_name + "', price = '" + price + "'\n      WHERE book_code = '" + book_code + "';", function (err, results) {
        if (err) {
            res.sendStatus(400);
            console.log(err);
        }
        else {
            console.log(results);
            connection.query("SELECT * FROM book WHERE title = '" + title + "' AND last_name = '" + last_name + "';", function (err, resu) {
                if (err)
                    return res.sendStatus(400);
                res.send({ resu: resu });
            });
        }
    });
});
app.get("/users", function (req, res) {
    try {
        var token = req.headers.authorization.replace("Bearer ", "");
        var isAdmin_1 = jsonwebtoken_1["default"].verify(token, myprivatekey).isAdmin;
        connection.query("SELECT id_users, username, email" + (isAdmin_1 ? ", isAdmin" : "") + " FROM users;", function (err, results) {
            if (err)
                console.log(err);
            console.log(results);
            res.send(isAdmin_1
                ? results.map(function (user) { return (__assign(__assign({}, user), { isAdmin: Boolean(user.isAdmin) })); })
                : results);
        });
    }
    catch (_a) {
        res.sendStatus(401);
    }
});
app.post('/auth', function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    try {
        connection.query("SELECT * FROM users WHERE username = '" + username + "' \n        AND password = sha1('" + password + "');", function (err, results) {
            if (err)
                return err;
            if (results && results.length) { //si existe usuario en la db
                var _a = results[0], email = _a.email, isAdmin = _a.isAdmin;
                var payload = {
                    username: username,
                    isAdmin: Boolean(isAdmin),
                    email: email
                };
                var token = jsonwebtoken_1["default"].sign(payload, myprivatekey);
                res.send({ token: token });
            }
            else {
                res.sendStatus(401);
            }
        });
    }
    catch (_b) {
        res.sendStatus(500);
    }
});
/*End points para usuario, requiere autentificación*/
app.get('/users/:userId/books', function (req, res) {
    var userId = req.params.userId;
    console.log(userId);
    var token = req.headers.authorization.replace("Bearer ", "");
    console.log('token' + token);
    jsonwebtoken_1["default"].verify(token, myprivatekey);
    connection.query("SELECT * FROM book \n        LEFT JOIN users_book ON book.book_code = users_book.book_code\n        WHERE users_book.id_users ='" + userId + "';", function (err, results) {
        if (err)
            return res.sendStatus(401);
        console.log(results);
        res.send(results);
    });
});
app.post('/users/:userId/books/:book_code', function (req, res) {
    var _a = req.params, userId = _a.userId, book_code = _a.book_code;
    var token = req.headers.authorization.replace("Bearer ", "");
    jsonwebtoken_1["default"].verify(token, myprivatekey);
    connection.query("INSERT INTO users_book (id_users, book_code)\n            SELECT * FROM (SELECT '" + userId + "', '" + book_code + "') AS tmp \n            WHERE NOT EXISTS (SELECT book_code FROM users_book \n            WHERE book_code = '" + book_code + "' AND id_users = '" + userId + "')", function (err, results) {
        if (err) {
            res.sendStatus(401);
            console.log(err);
        }
        else {
            connection.query("SELECT * FROM book \n                LEFT JOIN users_book ON book.book_code = users_book.book_code\n                WHERE users_book.id_users ='" + userId + "';", function (err, results) {
                if (err)
                    return res.sendStatus(401);
                res.send(results);
            });
        }
    });
});
app["delete"]('/users/:userId/books/:book_code', function (req, res) {
    var _a = req.params, userId = _a.userId, book_code = _a.book_code;
    var token = req.headers.authorization.replace("Bearer ", "");
    jsonwebtoken_1["default"].verify(token, myprivatekey);
    connection.query("DELETE FROM users_book WHERE book_code = '" + book_code + "'\n     AND id_users = '" + userId + "';", function (err, results) {
        if (err)
            return res.sendStatus(401);
        res.send(results);
    });
});
app.listen(3000);
