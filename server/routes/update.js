const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const db = require('../index');
const { FieldValue } = require('firebase-admin/firestore');
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

// creates a new user with firstName, lastName, and email
router.post('/setUsers', async function (req, res) {
  try{
    console.log(req.body);
    await db.db.collection("users").doc(req.body.email).set(req.body);
    //one problem is that email is saved under the email --> needs to be deleted
    res.send(req.body)
  } catch (err){
    res.send(err)
  }
})

// adds user preference (preferred temperature) to user
router.post('/setTemp', async function (req, res) {
  try {
    await db.db.collection("users").doc(req.body.email).update({
      temperature: parseInt(req.body.temperature)
    });
    res.send(req.body);
  } catch (err) {
    res.send(err)
  }
})

// creates a home
router.post('/setHome', async function (req, res) {
  try {

    /*
    req body looks like this
      {
        code: [home code]
        email: [the email of the user who created it]
        longitude: [of home]
        latititude: [of home]
        houseName: [homeName] 
      }
    */

    // not sure how geolocation works
    // geolocation: new GeoPoint(parseInt(req.body.latitude), parseInt(req.body.longitude)),  
    
    await db.db.collection("houses").doc(req.body.code).set({
      longitude: parseInt(req.body.longitude),
      latitude: parseInt(req.body.latitude),
      houseName: req.body.houseName
    })

    await db.db.collection("houses").doc(req.body.code).collection("users").doc(req.body.email).set({
      isAtHome: true, // not sure if these values should be true or false initially
      isCurrentHome: true,
    })

    await db.db.collection("users").doc(req.body.email).collection("houses").doc(req.body.code).set({
      isAtHome: true, // not sure if these values should be true or false initially
      isCurrentHome: true,
    })

    res.send(req.body);
  } catch (err) {
    res.send(err)
  }
})

// joins a home
router.post('/joinHome', async function (req, res) {
  try {
    /*
    req body looks like this
      {
        code: [home code]
        email: [the email of the user who is joining]
      }
    */
    await db.db.collection("houses").doc(req.body.code).collection("users").doc(req.body.email).set({
      isAtHome: true, // not sure if these values should be true or false initially
      isCurrentHome: true,
    })

    await db.db.collection("users").doc(req.body.email).collection("houses").doc(req.body.code).set({
      isAtHome: true, // not sure if these values should be true or false initially
      isCurrentHome: true,
    })

    res.send(req.body)
  } catch (err) {
    res.send(err)
  }
})

  module.exports = router;