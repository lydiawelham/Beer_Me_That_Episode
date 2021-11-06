import fetch from "node-fetch"

exports.handler = async function (event) {
    const limit = JSON.parse(event.body);

    // Queries the database for list of seasons
    const url = process.env.ASTRA_GRAPHQL_ENDPOINT
    const query = `
        query getAllSeason {
            reference_list (
                value: {label: "season"},
                options: {limit: ${JSON.stringify(limit)}}
            ) {
            values {
                value
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