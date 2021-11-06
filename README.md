# Creating a Meme to Episode Catalogue using React and Astra DB

Credit Ania Kubow
Credit Angela Delise - tutorial on search bars in scss - converted for use with react and changed styling attributes
Credit Emma Goto - for accessibility tips for search bar and hidden label css

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Nomenclature: 
Seasons - collection of memes often by season, but also by character or theme
Episodes - individual memes (important distinction: in many instances there are multiple memes for each episode)

## TO DO: 

- Step 1: Create-react-app
        - Doing my project on a Raspberry Pi - first step was to install npm 
- Step 1b: Set up GitHub repo - 
> git add . && git commit -m "commit msg" && git push
- Step 2: Create logo in canva
- Step 3: Create DB with Astra using GraphQL Playground (via API)
- Step 4: Set up Netlify CLI > set-up netlify functions

## Creating a database in Astra using GraphQL API

1. Inital set up of database on Astra (GUI?) - keep hold of the keyspace name you have chosen
2. Generate 'database admin' token (save to CSV)
3. Enter GraphQL playground using API (provided by Astra)
4. Enter tokens into GraphQL-Scheme and GraphQL tabs (under http headers):
        >"x-cassandra-token": ""<
Remove 'system' from end of URL in GraphQL tab and replace with your keyspace name e.g. "memes_keyspace"
5. Create two tables - one for seasons (as we intend to order data (memes) by season) and one for episodes (how we will call individual data)
        ### Table 1: table name: reference_list (table of seasons 1-6)
        in GraphQL-Schema tab: 
        >mutation {
  reference_list: createTable(
    keyspaceName: "beer_keyspace"
  	tableName: "reference_list",
    ifNotExists: true
    partitionKeys: [
      {name: "label", type: {basic: INT}
    ]
    clusteringKeys: [
      {name: "value", type: {basic: INT}, order: "ASC"}
    ]
    
  )
}< 
This will sort by seasons. In my code I am using INT instead of TEXT as I want to order my seasons numerically. (Perhaps I can do this with strings - who knows with JS?)

        ###Table 2: Episodes_by_season
        >mutation {
episodes_by_season: createTable (
  keyspaceName:"beer_keyspace"
  tableName: "episodes_by_season",
  ifNotExists: true
  partitionKeys: [
    {name: "season", type: {basic: INT}}
  ]
  clusteringKeys: [
    {name: "episode_no", type: {basic: INT}, order: "ASC"},
    {name: "episode_name", type: {basic: TEXT}, order: "ASC"},
  ]
  values: [
    {name: "meme_name", type: {basic: TEXT}},
    {name: "meme_img", type: {basic:TEXT}},
    {name: "netflix_link", type: {basic: TEXT}}
  ]
)
}< 
We have introduced all the table headers we need, with episode no and episode name allocated as the ones we will sort by. 
6. Populate seasons values:
>mutation insertSeasons {
        One: insertreference_list(value: {label: "season", value: "One"}) {
                value{value}}
        }
}<
Repeat for each season.
7. Uploaded CSV of memes/episode data to database on Astra GUI - THIS created new table called office_memes_to_episodes - no need to create episodes_by_season - i.e. skip step 5b 

### In hindsight... 
I would have set meme_name as the clustering key - as there are multiple memes per episode. I would also have added a 'characters column', and considered setting the reference_list value to the characters in the meme to allow the website to format by into characters for the user to select their favourite.

If I wanted to change this table and set the clustering keys to meme_name I could add a new table and I would need to change the query in getEpisodes.js

7.a. 
>mutation insertEpisodes {
  Entry_name : insertmemes_by_season(
    value:{
      season: "Three",
      episode_no: 20,
      meme_img: "https://media4.giphy.com/media/WZkqBi7EF37YA/giphy.gif?cid=ecf05e47becm6hse19bm5txriv8b3cj20kf6bpskcnxl80fw&rid=giphy.gif&ct=g",
      alt_name: "Jim says Lord beer me strength",
      netflix_link: "https://www.netflix.com/watch/70080642",
      episode_name: "Product Recall",
      meme_index: 41
    }
  ) {
    value{meme_index}
  },
  
}<


git commit:
>git add . && git commit -m 'database live, main body styling complete, header complete  and search bar in progress' && git push


mutation {
  referenceSeasons: createTable(
    keyspaceName: "office_memes"
  	tableName: "referenceSeasons",
    ifNotExists: true
    partitionKeys: [
      {name: "label", type: {basic: TEXT}}
    ]
    clusteringKeys: [
      {name: "order_no", type: {basic: INT}, order: "ASC"}
      {name: "value", type: {basic: TEXT}}
    ])
  }