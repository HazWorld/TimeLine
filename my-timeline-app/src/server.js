const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const uri = "mongodb+srv://hmccormick12:JgiswRdhQ7@timelinecluster.omxq2.mongodb.net/?retryWrites=true&w=majority&appName=TimelineCluster";
const JWT_SECRET = 'your_jwt_secret_key';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect().then(() => {
  console.log("Connected to MongoDB");

  const db = client.db("timelineApp");
  const usersCollection = db.collection("users");

  app.post('/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await usersCollection.insertOne({ username, email, password: hashedPassword });
      res.json({ message: 'User created successfully', userId: result.insertedId });
    } catch (error) {
      console.error("Error during sign-up:", error);
      res.status(500).json({ message: "Error signing up" });
    }
  });

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await usersCollection.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user._id });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }

  app.get('/events/:userId', authenticateToken, async (req, res) => {
    try {
      const { userId } = req.params;
      const events = await db.collection("events").find({ userId }).sort({ date: 1 }).toArray();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Error fetching events" });
    }
  });

  app.post('/events', authenticateToken, async (req, res) => {
    try {
      const { userId, text, date } = req.body;
      const result = await db.collection("events").insertOne({ userId, text, date });
      res.json({ message: "Event added", eventId: result.insertedId });
    } catch (error) {
      console.error("Error inserting event:", error);
      res.status(500).json({ message: "Error adding event" });
    }
  });

  app.delete('/events/:eventId', authenticateToken, async (req, res) => {
    const { eventId } = req.params;
    try {
      const result = await db.collection("events").deleteOne({ _id: new MongoClient.ObjectId(eventId) });
      if (result.deletedCount === 1) {
        res.json({ message: "Event deleted successfully" });
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Error deleting event" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.error("MongoDB connection error:", err));