import fetch from "node-fetch";

exports.handler = async function () {

    const url = process.env.ASTRA_GRAPHQL_ENDPOINT
    const query = `
        query {
            episodes_by_season (
                value: "Season_One"
            ) {
                values {
                    episode_name
                }
            }
        }
    `
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