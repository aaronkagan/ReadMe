// ANNOUNCEMENT HANDLERS

// Setup for connecting to mongoDb
const { read } = require("fs");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Get all announcements
const getAnnouncements = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("announcements").find().toArray();
    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err });
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

// Get announcements from specific user
const getUserAnnouncements = async (req, res) => {
  const userId = req.params.userId;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("announcements").find({ createdById: userId }).toArray();

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err });
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

// Create a new announcement
const addAnnouncement = async (req, res) => {
  const announcement = req.body;

  // This might be unnecessary once the page is protected but i like it ;-)
  if (req.body.createdById === null) return res.status(400).json({ status: 400, error: "Please log in to be able to create an announcement" });

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("announcements").insertOne(announcement);

    return res.status(200).json({ status: 200, data: "Announcement has been added" });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err });
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

// Mark an announcement as read
const markRead = async (req, res) => {
  const announcementId = req.body.announcementId;

  console.log(announcementId);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("announcements").updateOne(
      { announcementId: announcementId },
      {
        $set: {
          isRead: true
        }
      }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({ status: 200, message: "Announcement has been marked read" });
    }
    if (result.modifiedCount === 0) {
      return res.status(400).json({ status: 400, error: "Announcement was already marked as read" });
    } else {
      return res.status(400).json({ status: 400, error: "An unknown error has occurred" });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, error: err });
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

// Delete an announcement
const deleteAnnouncement = async (req, res) => {
  const announcementId = req.body.announcementId;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("announcements").deleteOne({ announcementId: announcementId });

    return res.status(200).json({ status: 200, message: "Announcement has been deleted" });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err });
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

module.exports = { getAnnouncements, getUserAnnouncements, addAnnouncement, markRead, deleteAnnouncement };
