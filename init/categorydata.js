const mongoose = require("mongoose");
const Category = require("../models/categories");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
  .then(() => {
    console.log("MongoDB connection open");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

const categories = [
  { name: "Beach", icon: "beach_access" },
  { name: "Mountain", icon: "terrain" },
  { name: "City", icon: "location_city" },
  { name: "Countryside", icon: "cottage" },
  { name: "Desert", icon: "wb_sunny" },
  { name: "Forest", icon: "forest" },
  { name: "Lake", icon: "waves" },
  { name: "Island", icon: "travel_explore" },
  { name: "Arctic", icon: "ac_unit" },
  { name: "Tropical", icon: "filter_vintage" },
  { name: "Skiing", icon: "downhill_skiing" },
  { name: "Historic", icon: "account_balance" },
  { name: "Camping", icon: "camping" },
  { name: "Luxury", icon: "king_bed" },
  { name: "Budget", icon: "money" },
];

const seedCategories = async () => {
  await Category.deleteMany({});
  await Category.insertMany(categories);
  console.log("Categories seeded");
  mongoose.connection.close();
};

seedCategories();
