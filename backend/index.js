import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import bookRoute from "./routes/bookRoute.js"

const app = express();

//use middleware to parse the request body
app.use(express.json())

//Middleware for handling CORS policy

//option 1 :Allow all orgins with default of cors(*)

app.use(cors())

//option 2: Allow custom origins

app.use(cors({
  origin:'http://localhost:3000',
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type']
}))





app.get("/", (req, res) => {
  console.log(req, "req");
  return res.send("hello");
});

app.use('/books',bookRoute)



mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`server is running successfully at ${PORT}`);
    });
  })
  .catch((er) => {
    console.log(er);
  });
