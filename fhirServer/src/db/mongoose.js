require('dotenv').config()
const mongoose = require('mongoose')

//Connecting to mongodb
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.log('Unable to connect to mongoBD   ', err);
    process.exit();
})
