export default async function handler(request, response) {
    const appIds = request.query.appIds || "1091390"

    const appDetailsUrl=`https://store.steampowered.com/api/appdetails/?appids=${appIds}&filters=price_overview`
    const appDetailsResp = await fetch(appDetailsUrl, {method: 'GET',})
    response.status(appDetailsResp.status)
    if (!appDetailsResp.ok) {
        response.send(await appDetailsResp.text())
        return
    }

    response.json(await appDetailsResp.json())
}