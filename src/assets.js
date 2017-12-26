const baseUrl = 'https://raw.githubusercontent.com/SEAKING-LOVE/pk-assets/master/';

const Assets = {
	animated: (pkid) => {
		return `${baseUrl}pokemon/animated/${pkid}.gif`;
	},
	artwork: (pkid) => {
		return `${baseUrl}pokemon/artwork/${pkid}.png`;
	},
	sprite: (pkid) => {
		return `${baseUrl}pokemon/sprites/${pkid}.png`;
	},
	footprint: (pkid) => {
		if(pkid > 649) return null;
		return `${baseUrl}pokemon/footprint/${pkid}.png`;
	},
	cry: (pkid) => {
		return `${baseUrl}pokemon/cries/${pkid}.mp3`;
	},
};

module.exports = Assets;
