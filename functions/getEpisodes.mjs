import fetch from "node-fetch"

exports.handler = async function (event) {
    const body = JSON.parse(event.body);
    const season = body.season;
    const pageState = body.pageState;
    const url = process.env.ASTRA_GRAPHQL_ENDPOINT;
    const query = `
        query {
            memes_by_season (
                value: {season: ${JSON.stringify(season)}},
                orderBy: [meme_index_ASC]
                options: {pageState: ${JSON.stringify(pageState)}}
            ) {
                values {
                    episode_no
                    episode_name
                    alt_text
                    meme_img
                    netflix_link
                    meme_index
                }
                pageState
            }
        }
    `;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type':  "application/json",
            "x-cassandra-token" : process.env.ASTRA_DB_APPLICATION_TOKEN
        },
        body: JSON.stringify({ query })
    })

    try {
        const responseBody = await response.json()
        return {
            statusCode: 200,
            body: JSON.stringify(responseBody)
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}