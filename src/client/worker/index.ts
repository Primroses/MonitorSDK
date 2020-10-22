import DB from "../data/dataBase";

const db = new DB("monitor");
db.read('error')
console.log(db);
