const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./app/models/Itinerary');
const authRoutes  = require("./app/routers/authRouter");
const userRoutes  = require("./app/routers/userRouter");
const eventRoutes = require('./app/routers/eventRouter');
const hotelRoutes = require('./app/routers/hotelRouter');
const itineraryRoutes = require('./app/routers/ItineraryRouter');

const cors = require("cors");

const app = express();
const PORT = 3200;

let corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.options("*", cors());

app.use(bodyParser.json());
app.use(authRoutes);
app.use(userRoutes);
app.use('/events',eventRoutes);
app.use('/hotels',eventRoutes);
app.use('/trips',itineraryRoutes);

//uncomment to create tables

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Error syncing database:', error);
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
