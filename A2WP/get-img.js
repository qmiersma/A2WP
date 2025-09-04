module.exports = {
    getImg: async function getImg({getUrl, postUrl, altText, auth}) {
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
            method: "GET", 
            cache: "force-cache"
        });
        if (!getRes.ok) console.log("\n\n", getRes); 

        let blob = await getRes.blob(); 

        // Pushes new image to WP media
        let postRes = await fetch(postUrl, {
            method: "POST", 
            headers: {
                "Authorization": auth,
                "Content-Type": `image/${type}`,
                "Content-Disposition": `attachment; filename="${fileName}"`
            }, 
            body: blob
        });
        if (!postRes.ok) console.log("\n\n", postRes); 
        let data = await postRes.json(); // Sets return data

        // Adds alt text to image
        let postRes2 = await fetch(`${postUrl}/${data.id}`, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                "Authorization": auth
            },
            body: JSON.stringify({
                "alt_text": altText
            })
        }); 
        if (!postRes2.ok) console.log("\n\n", postRes2);

        return data.id; 
    }
}; 