const mongoose = require('mongoose');
const config = require('../config.json');

mongoose.connect(config.bot.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database bağlantısı başarılı.'))
.catch(err => console.log('Database bağlantısı başarısız.' + err))