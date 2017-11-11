const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();


//CORS: allow web requests from any domain
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (req, res) => res.send('api root'));

const API_PATH = '/v1/';
const PokemonRouter = require('./routes/pokemon.router.js');
const EvolutionsRouter = require('./routes/evolutions.router.js');
const TypesRouter = require('./routes/types.router.js');
const AbilitiesRouter = require('./routes/abilities.router.js');
const MovesRouter = require('./routes/moves.router.js');

app.use(`${API_PATH}pokemon`, PokemonRouter);
app.use(`${API_PATH}evolutions`, EvolutionsRouter);
app.use(`${API_PATH}types`, TypesRouter);
app.use(`${API_PATH}abilities`, AbilitiesRouter);
app.use(`${API_PATH}moves`, MovesRouter);

app.listen(PORT, () => console.log('Listening on port ', PORT));