const express = require('express')

const app = express()
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || '/api';

app.use(express.json());
app.use(baseUrl, require('./controllers/users/user-controller'));
app.use(baseUrl, require('./controllers/sessions/session-controller'));
app.use(baseUrl, require('./controllers/profiles/profile-controller'));
app.use(baseUrl, require('./controllers/games/game-controller'));
app.use(baseUrl, require('./controllers/ratings/rating-controller'));
app.use(baseUrl, require('./controllers/records/record-controller'));
app.use(baseUrl, require('./controllers/achievements/achievement-controller'));
app.use(baseUrl, require('./controllers/levels/level-controller'));
app.use(require('./common/middlewares/error-middleware'));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})