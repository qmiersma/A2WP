const vpa = require("../A2WP/sbvpa-a2wp.js"); 
const mlk = require("../A2WP/dreamcenter-a2wp.js"); 

module.exports = async function (context, myTimer) {
    // WP Application Password setup
    const vpaAuth = `Basic ${btoa("appsadmin:" + process.env.SBVPA_PASS)}`; 
    const mlkAuth = `Basic ${btoa("appsadmin:" + process.env.DREAMCENTER_PASS)}`; 

    // Calling objs
    vpa.vpaCreator.auth = vpaAuth; 
    vpa.vpaCreator.call(); 

    // mlk.mlkCreator.auth = mlkAuth; 
    // mlk.mlkCreator.call(); 
};