# pk-api
Pokemon API

# Setting up the database

Create a postgres database named `pkapi`

Make sure you have the following python modules installed: 

```
pip install pandas
pip install psycopg2
pip install sqlalchemy
```

Once you've satisfied the prerequisites, make sure `pkapi` is running. Run the following command

```
npm run migration
```

To dump a copy of the database, run:
```
pg_dump pkapi --no-owner > initDB.sql
```

# API Docs
## /pokemon/
```
[
	{
		id: "1",
		identifier: "bulbasaur",
		height: "7",
		weight: "69",
		baseExperience: "64"
	},
	...
]
```