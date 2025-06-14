# A2WP
A2WP’s main goal is to fetch data from SBVPA’s Amilia account, format the results, and push the product to South Bend's WordPress websites. 

Follow the steps below to set up a new instance of A2WP.

### Step 1: Setting Up in Azure
A2WP exists as a function app in [Microsoft Azure](https://portal.azure.com/#@southbendin2.onmicrosoft.com/resource/subscriptions/1e53e397-32bd-4d3a-80d2-c3823b6a084d/resourceGroups/a2wp_group/providers/Microsoft.Web/sites/a2wp/appServices).

Once you travel to the link above, you'll see in the overview there are four functions. Of these, you should only need to edit **createA2WP** and/or **updateA2WP**. 

createA2WP runs on a timer (8 AM daily) and should only call more process-heavy A2WP instances -- such as instances where A2WP compares all relevant Amilia and WordPress data and then creates any new posts and deletes unused ones. 

updateA2WP executes on an HTTP trigger and should only call A2WP instances that require updating one specific WordPress post. 

To include a new instance, open up createA2WP/updateA2WP and add 1) the path to your script, 2) your site's WP Application Password, and then 3) call the instance. The code should look like this: 

```
const fake = require("../A2WP/fake-a2wp.js"); 

module.exports = async function (context, myTimer) {
    // WP Application Password setup
    const fakeAuth = `Basic ${btoa("appsadmin:" + process.env.FAKE_PASS)}`; 

    // Calling objs
    fake.fakeCreator.auth = fakeAuth; 
    fake.fakeCreator.call(); 
};
```
If you're adding an instance to updateA2WP, you'll also need to add ``fake.fakeUpdater.wp.args += `&slug=${slug}`;`` in the line before using call(). 

To see how to make the scripts you'll need to include in the require(), please read the [documentation](https://github.com/qmiersma/A2WP/raw/refs/heads/main/a2wp-documentation.docx). These will be how A2WP manipulates the Amilia data -- and how it decides what to post and delete. 

The FAKE_PASS referenced here is an environment var you'll need to make within this Azure project. The value of this password should be your WP site's Application Password. The username should be appsadmin, meaning your WP site needs an account named appsadmin. 

### Step 2: Setting Up in WP File Manager
The only file you should alter in WP File Manager is going to be your theme's functions.php file. To find it, go to WP Engine and open the site in admin view. On the very bottom of the left side menu is WP File Manager. Open the file manager and find your theme folder: 

(site-name) > wp-content > themes > (theme-folder)

Inside this folder is functions.php. Copy-paste this code into the file (don't erase anything anything else that exists in functions.php!). 

```
/* -------- Amilia > Wordpress API --------*/
function amilia_to_wp() {
	$path = $_SERVER["REQUEST_URI"]; 
	$regex = "/\/+[^\/\W]+-+[\d]+\/*$/"; 

	if (preg_match($regex, $path)) {
		error_log(print_r("Slug matched! Running updateA2WP", true)); 
		wp_remote_post("https://a2wp.azurewebsites.net/api/UpdateA2WP", 
		[
			'headers' => ['request_path' => $path]
		]); 
	} 
}
add_action('init', 'amilia_to_wp'); 

function add_amilia_id_field() {
    register_rest_field(
		'activities', 
		'amilia_id', 
		[
			'get_callback'    => function($object) {
				return get_post_meta($object['id'], 'amilia_id', true);
			}, 
            'update_callback' => function($value, $object) {
                return update_post_meta($object->ID, 'amilia_id', $value); 
            }, 
            'schema'          => [
                'type'      => 'string', 
                'default'   => ''
            ]
		]
	); 
}
add_action('rest_api_init', 'add_amilia_id_field');

function query_by_amilia_id($args, $request) {
	if (isset($request["amilia_id"])) {
		$args["meta_key"] = "amilia_id"; 
		$args["meta_value"] = $request["amilia_id"]; 
	}

	return $args; 
}
add_filter('rest_activities_query', 'query_by_amilia_id', 10, 2); 
```
Replace the 'activities' in `register_rest_field('activities', ...)` and `add_filter('rest_activities_query', ...)` with the name of your custom WP post type (or just replace with 'post' if you're not using a custom type).  