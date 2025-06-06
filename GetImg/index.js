module.exports = async function (context, req) {
    const getUrl = req.body.getUrl;
    const postUrl = req.body.postUrl; 
    const mediaUrl = req.body.mediaUrl; 
    const auth = req.body.auth; 

    // Creates file name
    const idString = "1234567890abcdefghijklmnopqrstuvwxyz"; 
    let id = ""; 
    for (let i = 0; i < 10; i++) {
        id += idString[Math.floor(Math.random() * idString.length)]; 
    }
    const type = getUrl.split(".").pop().toLowerCase(); 
    const fileName = `${id}.${type}`; 
  
    // Grabs binary data from image
    let getRes = await fetch(getUrl, {
        method: "GET"
    });

    let blob = await getRes.blob(); 
    // context.log("\n\nBLOB -->", blob); 

    // Pushes new image to WP media
    let postRes = await fetch(mediaUrl, {
        method: "POST", 
        headers: {
            "Authorization": auth,
            "Content-Type": `image/${type}`, 
            "Content-Disposition": `attachment; filename="${fileName}"`
        }, 
        body: blob
    });

    if (!postRes.ok) context.log("\n\n", postRes); 
    let data = await postRes.json(); 

    const acf = (auth == `Basic ${btoa("appsadmin:" + process.env.DREAMCENTER_PASS)}`) ? {"event_image": data.id} : null; 

    // Updates activity's featured_media id
    let postRes2 = await fetch(postUrl, {
        method: "POST", 
        headers: {
            "Authorization": auth, 
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            "featured_media": data.id, 
            acf
        })
    });

    if (!postRes2.ok) context.log("\n\n", postRes2); 

    context.res = {
        //status:200,
        body: postRes
    };
}