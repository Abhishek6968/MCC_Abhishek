const express = require('express');
const app = express();
app.use(express.json());
require('./config/db')
const morgan=require('morgan');
app.use(morgan('dev'));
require('dotenv').config();
const PORT=process.env.PORT

const userRoutes = require('./routes/userRoutes');
const stateRoutes = require('./routes/stateRoutes');
const regionRoutes=require('./routes/regionRoutes');
const centerRoutes=require('./routes/centerRoutes');



app.use('/api/users', userRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/centers', centerRoutes);






app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
