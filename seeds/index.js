const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors,places} = require('./seedHelpers');
const campground = require('../models/campground');

mongoose.connect("mongodb://localhost:27017/wild-whirl");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
  await campground.deleteMany({});
  for(let i = 0;i < 1000;i++)
    {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 20) + 10;
      const camp = new campground({
        author: "666d3433f91f73484e4fd50f",
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        geometry: {
          type: "Point",
          coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
          ],
        },
        image: [
          {
            url: "https://res.cloudinary.com/dhknjqigy/image/upload/v1720342904/wildWhirl/dnru13xxzmh7n17sr4aq.avif",
            filename: "wildWhirl/dnru13xxzmh7n17sr4aq"
          }
        ],
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
        price,
      });
      await camp.save();
    }
}

seedDB().then(() => {
  mongoose.connection.close();
})