const mongoose = require('mongoose');
const Service = require('../models/service.js');
const data = require('./data.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/glamora";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to glamora database");
    await initDB();
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
  }
}

const initDB = async () => {
  try {
    if (!data || !data.services) {
      throw new Error("data.services missing in data.js");
    }

    await Service.deleteMany({});
    console.log("Old data cleared");

    const flatServices = [];

    const validCategories = ["face", "hair", "nail", "other"];

    for (const category in data.services) {
      if (!validCategories.includes(category)) {
        console.warn(`Skipping unknown category: ${category}`);
        continue;
      }

      data.services[category].forEach(item => {
        flatServices.push({
          name: item.name?.trim(),
          duration: item.duration,
          price: item.price,
          desc: item.desc || "",
          image: item.image,
          category
        });
      });
    }

    if (flatServices.length === 0) {
      throw new Error("No services to insert!");
    }

    const result = await Service.insertMany(flatServices);
    console.log(`Inserted ${result.length} services successfully!`);

  } catch (err) {
    console.error("Initialization error:", err.message);
  }
};

main();
