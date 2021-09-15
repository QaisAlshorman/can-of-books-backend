'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

//MongoDB
const mongoose = require('mongoose');

let BooksModel;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  const bookSchema = new mongoose.Schema({
    title: String,
    desciption: String,
    status: String,
    ownerEmail: String
  });

  BooksModel = mongoose.model('Books', bookSchema);

  // seedData();
}

//seeding a data function 

async function seedData() {
  const Don_Quixote = new BooksModel({
    title: 'Don Quixote',
    desciption: 'The novel’s tragicomic hero. Don Quixote’s main quest in life is to revive knight-errantry in a world devoid of chivalric virtues and values. He believes only what he chooses to believe and sees the world very differently from most people. Honest, dignified, proud, and idealistic, he wants to save the world. As intelligent as he is mad, Don Quixote starts out as an absurd and isolated figure and ends up as a pitiable and lovable old man whose strength and wisdom have failed him.',
    status: 'best sales',
    ownerEmail: 'qaishorman20@gmail.com'

  });

  const A_Tale_of_Two_Cities = new BooksModel({
    title: 'A Tale of Two Cities',
    desciption: 'A French aristocrat by birth, Darnay chooses to live in England because he cannot bear to be associated with the cruel injustices of the French social system. Darnay displays great virtue in his rejection of the snobbish and cruel values of his uncle, the Marquis Evrémonde. He exhibits an admirable honesty in his decision to reveal to Doctor Manette his true identity as a member of the infamous Evrémonde family. So, too, does he prove his courage in his decision to return to Paris at great personal risk to save the imprisoned Gabelle.',
    status: 'best sales',
    ownerEmail: 'qaishorman20@gmail.com'
  });

  const The_Lord_of_the_Rings = new BooksModel({
    title: ' The Lord of the Rings',
    desciption: 'The heir to the throne of Gondor. Though Aragorn is the rightful king of Gondor, he travels under an assumed identity at the beginning of the trilogy: he is a ranger, known as Strider. The fact that he is not upon the throne reveals the weak state of the kingdoms of men. As the trilogy proceeds, Aragorn shows himself to be a noble leader with a pure heart. He is relatively unaffected by desire for the ring and routinely throws himself in harm’s way to ensure the fellowship’s survival. In love with the elf princess Arwen, he fights for her survival and for the successful return of the ring to Mordor. He becomes increasingly comfortable asserting his royal identity, but only when he addresses the men of the mountain in The Return of the King does he actually declare himself king of Gondor. By the time he is crowned king at the end of the final film, he has proven himself to be a worthy leader.',
    status: 'best sales',
    ownerEmail: 'qaishorman20@gmail.com'
  });


  await Don_Quixote.save();
  await A_Tale_of_Two_Cities.save();
  await The_Lord_of_the_Rings.save();
}


//Routes
server.get('/', homeHandler);
server.get('/getBooks', getBooksHandler);
server.get('/books', seedData);
server.post('/addBooks', addBooksHandler);
server.delete('/deleteBooks/:id', deleteBookHandler);
server.put('/updateBook/:id', updateBooksHandler);
//Functions Handlers
function homeHandler(req, res) {

  res.send('Home Page');
}

function getBooksHandler(req, res) {
  //send fav Books list (email)
  const email = req.query.email;
  BooksModel.find({ ownerEmail: email }, (err, result) => {
    console.log(result);
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  })
}

async function addBooksHandler(req, res) {
  // console.log(req.body);

  const { title, status, ownerEmail } = req.body;
  await BooksModel.create({
    title: title,
    status: status,
    desciption: desciption,
    ownerEmail: email
  });
  BooksModel.find({ ownerEmail: email }, (error, result) => {
    if (err) {
      console.log("error in try in again")
    } else { res.send(result.data) }
  }
  );
}
function deleteBookHandler(req, res) {

  const bookID = req.params.id
  const email = req.query.email

  BooksModel.deleteOne({ _id: bookID }, (err, result) => {
    BooksModel.find({ ownerEmail: email }, (error, result) => {

      res.send(result);

    })
  })

}

function updateBooksHandler(req, res) {
  const id = req.params.id;
  const { title, desciption, email } = req.body;
  console.log(id, title, desciption);

  BooksModel.findByIdAndUpdate(id, { title, desciption }, (err, result) => {
    BooksModel.find({ ownerEmail: email }, (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    })
  })
}
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})
