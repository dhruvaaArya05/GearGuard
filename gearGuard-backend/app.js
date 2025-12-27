const express = require('express');
const cors = require('cors');

const equipmentRouter = require('./routers/equipmentRouter');
const requestRouter = require('./routers/requestsRouter');
const teamsRouter = require('./routers/teamsRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/eqipment', equipmentRouter);
app.use('/api/requests', requestRouter);
app.use('/api/teams', teamsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to GearGuard Backend!');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server is running on address http://localhost:${PORT}`);
});