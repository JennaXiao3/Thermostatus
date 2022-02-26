const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const db = require('../index');
const { restart } = require('nodemon');
//const { roundToNearestPixel } = require('react-native/Libraries/Utilities/PixelRatio');
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get('/getUsers', async function (req, res) {
    try{
      let result = []
      const usersSnapshot = await db.db.collection("users").get();
      usersSnapshot.forEach((e)=>{
        result.push(e.data())
      });
      res.send(result)
    } catch (err){
      res.send(err)
    }
  })


// getting all houses
router.get('/getHouses', async function (req, res) {
  try{
    let result = []
    const usersSnapshot = await db.db.collection("houses").get();
    usersSnapshot.forEach((e)=>{
      result.push(e.data())
    });
    res.send(result)
  } catch (err) {
    res.send(err)
  }
});

// get all house codes
router.get('/getHouseCodes', async function (req, res) {
  try{
    let result = []
    const usersSnapshot = await db.db.collection("houses").get();
    usersSnapshot.forEach((e)=>{
      result.push(e.id)
    });
    res.send(result)
  } catch (err) {
    res.send(err)
  }
});


// getting all fields for a certain house id
router.get('/getHouseFields/:houseId', async function (req, res) {
  try{
    const houseId = req.params.houseId;
    const houseSnapshot = await db.db.collection("houses").doc(houseId).get();
    let done = houseSnapshot.data();

    res.send(done);

  } catch (err) {
    res.send(err);
  }
});


// getting all thermostat codes
router.get('/getThermostatCodes', async function (req, res) {
  try{
    let result = []
    const usersSnapshot = await db.db.collection("houses").get();
    usersSnapshot.forEach((e)=>{
      result.push(e.data().thermostat)
    });
    res.send(result)
  } catch (err) {
    res.send(err)
  }
});



// RELATED TO USERS

// getting all users of a single house
router.get('/getHouseUsers/:houseId', async function (req, res) {
  try {
    let result = [];
    const houseId = req.params.houseId;
    const houseSnapshot = await db.db.collection("houses").doc(houseId).collection("users").get();
    houseSnapshot.forEach((item) => {
      result.push(item.id);
    });

    res.send(result);
  } catch (err) {
    res.send(err);
  }
})
  module.exports = router;