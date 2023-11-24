export default async function handler(request, response) {
    const appids = request.query.appids
    if (!appids)
        return response.status(400)

    await fetch(`https://store.steampowered.com/api/appdetails/?appids=${appids}&filters=price_overview`)
        .then(resp => resp.json()
            .then(json => response.status(200).json(json)
            , reason => response.status(500).send(reason))
        , reason => response.status(500).send(reason))
}