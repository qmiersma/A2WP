module.exports = async function (context, req) {
    const baseUrl = `https://app.amilia.com/api/V3/en/org/sbvpa/${req.body.endpoint}`;

    let getRes = await fetch(baseUrl, {
        method: "GET", 
        headers: {
            "Authorization": `Bearer ${process.env.AUTH_TOKEN}`
        }
    }); 

    getRes = await getRes.json(); 
    context.log(getRes); 

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: getRes
    };
}