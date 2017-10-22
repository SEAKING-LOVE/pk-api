# pk-api
Pokemon API

# Setting up the database

Create a postgres database named `pkapi`

Make sure you have the following python modules installed: 

```
pip install pandas
pip install os
pip install sqlalchemy
```

Once you've satisfied the prerequisites, make sure `pkapi` is running. Run the following command

```
npm run migration
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