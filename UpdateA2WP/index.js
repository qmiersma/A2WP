const vpa = require("../A2WP/sbvpa-a2wp.js"); 

module.exports = async function (context, req) {
    // Slug setup
    const path = req.headers.request_path; 
    const slug = path.match(/(?<=\/)[^\/]*(?=\/*(?=$))/); 

    // WP Application Password setup
    const vpaAuth = `Basic ${btoa("appsadmin:" + process.env.SBVPA_PASS)}`; 

    // Setting authorization and WP site URLs
    vpa.vpaUpdater.auth = vpaAuth;
    vpa.vpaUpdater.wp.url = process.env.SBVPA_URL; 

    // Calling objs 
    vpa.vpaUpdater.wp.args += await `&slug=${slug}`; 
    vpa.vpaUpdater.call(); 
    
    context.res = {
        status: 200, /* Defaults to 200 */
        // body: responseMessage
    };
}