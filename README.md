# A2WP
A2WP’s main goal is to fetch data from SBVPA’s Amilia account, format the results, and push the product to South Bend's WordPress websites. 

### Step 1: Setting Up in Azure

### Step 2: Setting Up in WP File Manager
The only file you should alter in WP File Manager is going to be your theme's functions.php file. To find it, go to WP Engine and open the site in admin view. On the very bottom of the left side menu is WP File Manager. Open the file manager and find your theme folder: 

(site-name) > wp-content > themes > (theme-folder)

Inside this folder is functions.php. Copy-paste this code into the file (don't erase anything anything else that exists in functions.php!). 

/* -------- Amilia > Wordpress API --------*/
function amilia_to_wp() {
	// wp_enqueue_script('a2wp', get_stylesheet_directory_uri() . '/js/a2wp.js', array(), '', true); 
	// wp_enqueue_script('call-a2wp', get_stylesheet_directory_uri() . '/js/call-a2wp.js', array(), '', true); 

	wp_localize_script('a2wp', 'apiData', array(
    	'nonce' => wp_create_nonce('wp_rest'),
        'path' => get_stylesheet_directory_uri()
    )); 
}
add_action('wp_enqueue_scripts', 'amilia_to_wp'); 

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

### Debug
