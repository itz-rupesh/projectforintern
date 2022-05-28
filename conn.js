const mongoose = require('mongoose');



// MONGODB CONNECTION

mongoose.connect(process.env.DB_CONNECTION_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true

}).then(() => console.log("db connected"))
  .catch(err => console.log(err));

