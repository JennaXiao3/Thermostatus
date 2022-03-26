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
router.get('/getHouseFields', async function (req, res) {
  try{

    /*
    req body looks like this
      {
        email: [the email of the user who created it]
      }
    */
   //console.log(req.body.houseId);

   /*
    const houseId = req.body.houseId;
    const houseSnapshot = await db.db.collection("houses").doc(houseId).get();
    let done = houseSnapshot.data();
    
    const email = req.body.email;
    const currentHomeSnapshot = await db.db.collection("users").doc(email).collection("houses").doc(houseId).get();
    let currentHome = currentHomeSnapshot.data().isCurrentHome;
    
    let count = 0;
    const usersSnapshot = await db.db.collection("houses").doc(houseId).collection("users").get();
    usersSnapshot.forEach((item) => {
      count++;
    });

    done["numOfPeople"] = count;
    done["isCurrentHome"] = currentHome;

    res.send(lots);*/

    // ---------------------------

    let codes = [];
    let total = 0;
    const email = req.body.email;
    let result = [];

    const homesSnapshot = await db.db.collection("users").doc(req.body.email).collection("houses").get();
    homesSnapshot.forEach((e)=>{
      codes.push(e.id);
      total++;
    });

    for (let i = 0; i < total; i++) {

      const houseId = codes[i];
      
      const houseSnapshot = await db.db.collection("houses").doc(houseId).get();
      let done = houseSnapshot.data();

      const currentHomeSnapshot = await db.db.collection("users").doc(email).collection("houses").doc(houseId).get();
      let currentHome = currentHomeSnapshot.data().isCurrentHome;
      
      let count = 0;
      const usersSnapshot = await db.db.collection("houses").doc(houseId).collection("users").get();
      usersSnapshot.forEach((item) => {
        count++;
      });

      done["numOfPeople"] = count;
      done["isCurrentHome"] = currentHome;

      result.push(done);
    }
    
    res.send(result);
    //res.send(result);
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


  // get user current house
  // returns: house code
  router.get('/getCurrentHouse/:userid', async function (req, res) {
    try{
      let houseIds = [];
      let first = true;
      let result = false;
      const userId = req.params.userid;
      const houseSnapshot = await db.db.collection("users").doc(userId).collection("houses").get();
      houseSnapshot.forEach((item) => {
        let hasUser = item.data().isCurrentHome;
        if (hasUser && first) {
          first = false;
          result = item.id;
        }
      });


      res.send(result);

    } catch (err) {
      res.send(err)
    }
  });

  // get house coordinates in database
  router.get('/getHouseCoords/:houseid', async function (req, res) {
    try{
      //console.log("beginning");
      let result = {longitude: 0, latitude: 0};

      const houseId = req.params.houseid;
      //console.log("right before snapshot");

      const snapshot = await db.db.collection("houses").doc(houseId).collection("location").doc("geopoint").get();
      result.longitude = snapshot.data().longitude;
      result.latitude = snapshot.data().latitude;
      //console.log("after snapshot");

      res.send(result);
      
    } catch (err) {
      res.send(err);
    }

  });


  router.get('/getStatus/:userid', async function (req, res) {
    try {
      let result = {
        username: 'hi',
        temp: 100,
      };

      const userId = req.params.userid;
      const userSnap = await db.db.collection("users").doc(userId).get();
      const email = userSnap.data().email;
      const temp = userSnap.data().temperature;
      result.username = email;
      result.temp = temp;

      res.send(result);

    } catch (err) {
      res.send(err);
    }
  });

