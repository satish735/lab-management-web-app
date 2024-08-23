import mongoose from "mongoose";
import state from "../models/state.js"; // Ensure paths are correct
import city from "../models/city.js"; // Ensure paths are correct
import country from "../models/country.js"; // Ensure paths are correct
import fs from "fs/promises"; // Use fs/promises for promise-based file operations
import path from "path";

const countries = [
  {
    name: "India",
    latitude: "20.00000000",
    longitude: "77.00000000",
    iso3: "IND",
    iso2: "IN",
    numeric_code: 356,
  },
];

async function loadJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}
async function seedDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://puria8387:QSNaJukhTKPQ1b3r@managacluster.dfib5vs.mongodb.net/?retryWrites=true&w=majority&appName=ManagaCluster",
      {
        dbName: "blalab_db",
      }
    );

    console.log("Connected to MongoDB");
    await country.deleteMany({});
    await state.deleteMany({});
    await city.deleteMany({});
    const countriesData = await loadJSON(
      path.join("data", "countries+states+cities.json")
    );
    var countryData = countriesData.filter(
      (countryItem) => countryItem?.iso2 == "IN"
    );
    
    var transformedCountryData = countryData.map((countryItem) => {
      return {
        name: countryItem?.name,
        latitude: countryItem?.latitude,
        longitude: countryItem?.longitude,
        iso3: countryItem?.iso2,
        iso2: countryItem?.iso3,
        numeric_code: countryItem?.numeric_code,
      };
    });
    
    var stateData = countryData.flatMap(
      ({ states, name: country_name, iso2: country_code }) =>
        states.map((stateItem) => ({
          ...stateItem,
          country_code,
          country_name,
        }))
    );
    

    var transformedState = stateData.map((stateItem) => {
      return {
        name: stateItem?.name,
        country_code: stateItem?.country_code,
        country_name: stateItem?.country_name,
        state_code: stateItem?.state_code,
        latitude: stateItem?.latitude,
        longitude: stateItem?.longitude,
      };
    });
    var transformedCity = stateData
      .flatMap(
        ({
          cities,
          name: state_name,
          state_code,
          country_code,
          country_name,
        }) =>
          cities.map((cityItem) => ({
            ...cityItem,
            state_name,
            state_code,
            country_code,
            country_name,
          }))
      )
      .map((cityItem) => {
        return {
          state_name: cityItem?.state_name,
          state_code: cityItem?.state_code,
          country_code: cityItem?.country_code,
          country_name: cityItem?.country_name,
          name: cityItem?.name,
          latitude: cityItem?.latitude,
          longitude: cityItem?.longitude,
        };
      });
   
    await country.insertMany(transformedCountryData);
    await state.insertMany(transformedState);
    await city.insertMany(transformedCity);
    console.log("Seed data inserted");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    console.log("Connection closed");
  }
}

seedDB();
