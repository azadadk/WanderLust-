const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(()=>{
        console.log("connected to the DB");
    }).catch((err) =>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj, owner: "66f2a7de52a8d10046739873"}));
    await Listing.insertMany(initData.data);
    console.log("Data Was initialized");
}

initDB().then((res) =>{
    console.log(res)
}).catch((err)=>{
    console.log(err);
})