const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

export const onRequestGet:PagesFunction = (context) => {
    const params = new URL(context.request.url).searchParams
    const appids = params.get("appids")
    if (!appids)
        return new Response("Missing appids", {status: 400})

    return fetch(`https://store.steampowered.com/api/appdetails/?appids=${appids}&filters=price_overview`)
        .then(resp => resp.text()
            .then(json => new Response(json, {headers, status:200}),
                reason => new Response(reason, {headers, status:500}))
        , reason => new Response(reason, {headers, status:500}))
}
