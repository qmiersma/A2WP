<?php
@ini_set( 'upload_max_size' , '60M' );
@ini_set( 'post_max_size', '60M');
@ini_set( 'max_execution_time', '600' );

/*------ INCLUDES -------*/
include_once "includes/shortcodes.php";

/*------ ADD ACF OPTIONS PAGE -------*/
if(function_exists('acf_add_options_page')) {
	//acf_add_options_page();
    acf_add_options_page('Global Options');
}

/*------ ALLOW MORE FILE TYPES -------*/
function my_myme_types($mime_types){
    $mime_types['svg'] = 'image/svg+xml'; //Adding svg extension
    return $mime_types;
}
add_filter('upload_mimes', 'my_myme_types', 1, 1);


/*------ NAV MENUS -------*/
register_nav_menus(array(
    'footer-links-1' => __('Footer Links 1', 'pathfinders-child'),
    'footer-links-2' => __('Footer Links 2', 'pathfinders-child'),
    'subfooter-links' => __('Sub Footer Links', 'pathfinders-child'),
    'mobile-primary' => __('Mobile Menu', 'pathfinders-child'),
));
//  Get Menus as objects, to be able to grab attributes like $menu_obj->name
function get_menu_by_location( $location ) {
    if( empty($location) ) return false;
    $locations = get_nav_menu_locations();
    if( ! isset( $locations[$location] ) ) return false;
    $menu_obj = get_term( $locations[$location], 'nav_menu' );
    return $menu_obj;
}

// Order of Search Results
add_filter('posts_orderby','my_sort_custom',10,2);
function my_sort_custom( $orderby, $query ){
    global $wpdb;

    if(!is_admin() && is_search())
        $orderby =  $wpdb->prefix."posts.post_type ASC, {$wpdb->prefix}posts.post_date DESC";

    return  $orderby;
}

/*-------- Enqueue scripts and styles.--------*/
function pathfinder_child_scripts() {
    //wp_enqueue_style( 'pathfinder-style', get_stylesheet_directory_uri().'/style.css?'.time() );
    wp_enqueue_style( 'pathfinder-style', get_stylesheet_directory_uri().'/style.css' );
    wp_enqueue_style( 'fontawesome', 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style( 'slick', get_stylesheet_directory_uri().'/slick/slick.css');
    wp_enqueue_style( 'slick-theme', get_stylesheet_directory_uri().'/slick/slick-theme.css');
    //wp_enqueue_script( 'pathfinder-scripts', get_stylesheet_directory_uri().'/js/scripts.js', array(), time(), true );
    wp_enqueue_script( 'pathfinder-scripts', get_stylesheet_directory_uri().'/js/scripts.js', array(), '', true );
    /* Use WP variables in javascript */
    wp_localize_script('pathfinder-scripts', 'WPURLS', array(
        'siteurl' => esc_url(home_url()) ,
        'themeurl' => get_stylesheet_directory_uri(),
    ));
    wp_enqueue_script( 'lightbox_scripts', get_stylesheet_directory_uri() . '/js/ekko-lightbox.js', array(), '', true );
    wp_enqueue_script( 'parallax', 'https://cdn.jsdelivr.net/parallax.js/1.4.2/parallax.min.js', array(), '', true );
    wp_enqueue_script( 'slick_scripts', get_stylesheet_directory_uri() . '/slick/slick.min.js', array(), '', true );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

}
add_action( 'wp_enqueue_scripts', 'pathfinder_child_scripts' );

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

/* -------- OVERRIDDEN SCRIPTS --------*/
function pathfinder_posted_on() {
    $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
    if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
        $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><!--time class="updated" datetime="%3$s">%4$s</time-->';
    }

    $time_string = sprintf( $time_string,
        esc_attr( get_the_date( DATE_W3C ) ),
        esc_html( get_the_date() ),
        esc_attr( get_the_modified_date( DATE_W3C ) ),
        esc_html( get_the_modified_date() )
    );

    $posted_on = sprintf(
        /* translators: %s: post date. */
        esc_html_x( '%s', 'post date', 'pathfinder' ),
        //'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
        $time_string
    );

    echo '<span class="posted-on">' . $posted_on . '</span>'; // WPCS: XSS OK.

}
function pathfinder_posted_by() {
    $byline = sprintf(
        /* translators: %s: post author. */
        esc_html_x( '%s', 'post author', 'pathfinder' ),
        '<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
    );

    echo '<span class="byline"> ' . $byline . '</span>'; // WPCS: XSS OK.

}

	/**
	 * Displays post thumbnail as a backgroundimage for grids
	 */
	function pathfinder_grid_thumbnail() {
		if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
			return;
		}

        $image_id = get_post_thumbnail_id();
        $image = wp_get_attachment_image_src($image_id,'medium', true);

?>

		<a class="post-thumbnail bg-image bg-ltgray" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1" style="background-image:url(<?php echo $image[0]; ?>)">
		</a>

		<?php
	}


/*------ CUSTOM POST TYPES -------*/
function custom_post_type() {
	$labels = array(
		'name'                => 'Activities',
		'singular_name'       => 'Activity',
		'menu_name'           => 'Activities',
		'name_admin_bar'      => 'Activities',
		'parent_item_colon'   => 'Parent Activity:',
		'all_items'           => 'All Activities',
		'add_new_item'        => 'Add New Activity',
		'add_new'             => 'Add New',
		'new_item'            => 'New Activity',
		'edit_item'           => 'Edit Activity',
		'update_item'         => 'Update Activity',
		'view_item'           => 'View Activity',
		'search_items'        => 'Search Activity',
		'not_found'           => 'Not found',
		'not_found_in_trash'  => 'Not found in Trash',
	);
	$args = array(
		'label'               => 'Activity',
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'revisions', 'custom-fields' ),
		'taxonomies'          => array( 'age-group', 'activity-category' ),
		'hierarchical'        => true,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_rest'        => true,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-format-aside',
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => false,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'rewrite'             => array( 'slug' => 'things-to-do'),
		'rest_base'           => 'activities',
        'rest_controller_class' => 'WP_REST_Posts_Controller'
	);
	register_post_type( 'activities', $args );

    $labels = array(
		'name'                => 'Places',
		'singular_name'       => 'Place',
		'menu_name'           => 'Places',
		'name_admin_bar'      => 'Places',
		'parent_item_colon'   => 'Parent Place:',
		'all_items'           => 'All Places',
		'add_new_item'        => 'Add New Place',
		'add_new'             => 'Add New',
		'new_item'            => 'New Place',
		'edit_item'           => 'Edit Place',
		'update_item'         => 'Update Place',
		'view_item'           => 'View Place',
		'search_items'        => 'Search Place',
		'not_found'           => 'Not found',
		'not_found_in_trash'  => 'Not found in Trash',
	);
	$args = array(
		'label'               => 'Place',
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'revisions', 'page-attributes' ),
		'taxonomies'          => array( 'place-category', 'place-features' ),
		'hierarchical'        => true,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 6,
		'menu_icon'           => 'dashicons-location',
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'rewrite'             => true,
	);
	register_post_type( 'places', $args );

    $labels = array(
		'name'                => 'KBA Links',
		'singular_name'       => 'KBA Link',
		'menu_name'           => 'KBA Links',
		'name_admin_bar'      => 'KBA Links',
		'parent_item_colon'   => 'Parent KBA Link:',
		'all_items'           => 'All KBA Links',
		'add_new_item'        => 'Add New KBA Link',
		'add_new'             => 'Add New',
		'new_item'            => 'New KBA Link',
		'edit_item'           => 'Edit KBA Link',
		'update_item'         => 'Update KBA Link',
		'view_item'           => 'View KBA Link',
		'search_items'        => 'Search KBA Link',
		'not_found'           => 'Not found',
		'not_found_in_trash'  => 'Not found in Trash',
	);
	$args = array(
		'label'               => 'KBA Link',
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
		'taxonomies'          => array( 'category'),
		'hierarchical'        => true,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 20,
		'menu_icon'           => 'dashicons-book',
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'rewrite'             => true,
	);
	register_post_type( 'kba-links', $args );


}
add_action( 'init', 'custom_post_type', 0 );

/*------ CUSTOM TAXONOMIES -------*/
$labels = array(
	'name'                       => 'Activity Categories',
	'singular_name'              => 'Activity Category',
	'menu_name'                  => 'Activity Categories',
	'all_items'                  => 'All Activity Categories',
	'parent_item'                => 'Parent Activity Category',
	'parent_item_colon'          => 'Parent Activity Category:',
	'new_item_name'              => 'New Activity Category Name',
	'add_new_item'               => 'Add New Activity Category',
	'edit_item'                  => 'Edit Activity Category',
	'update_item'                => 'Update Activity Category',
	'view_item'                  => 'View Activity Category',
	'separate_items_with_commas' => 'Separate Activity Categories with commas',
	'add_or_remove_items'        => 'Add or remove Activity Category',
	'choose_from_most_used'      => 'Choose from the most used',
	'popular_items'              => 'Popular Activity Categories',
	'search_items'               => 'Search Activity Categories',
	'not_found'                  => 'Not Found',
);
$args = array(
	'labels'                     => $labels,
	'hierarchical'               => true,
	'public'                     => true,
	'show_ui'                    => true,
	'show_in_rest'        		 => true,
	'show_admin_column'          => true,
	'show_in_nav_menus'          => true,
	'show_tagcloud'              => true,
	'rest_base'           		 => 'activity-categories',
    'rest_controller_class' 	 => 'WP_REST_Terms_Controller'
);
register_taxonomy( 'activity-category', array( 'activities' ), $args );

$labels = array(
	'name'                       => 'Place Categories',
	'singular_name'              => 'Place Category',
	'menu_name'                  => 'Place Categories',
	'all_items'                  => 'All Place Categories',
	'parent_item'                => 'Parent Place Category',
	'parent_item_colon'          => 'Parent Place Category:',
	'new_item_name'              => 'New Place Category Name',
	'add_new_item'               => 'Add New Place Category',
	'edit_item'                  => 'Edit Place Category',
	'update_item'                => 'Update Place Category',
	'view_item'                  => 'View Place Category',
	'separate_items_with_commas' => 'Separate Place Categories with commas',
	'add_or_remove_items'        => 'Add or remove Place Category',
	'choose_from_most_used'      => 'Choose from the most used',
	'popular_items'              => 'Popular Place Categories',
	'search_items'               => 'Search Place Categories',
	'not_found'                  => 'Not Found',
);
$args = array(
	'labels'                     => $labels,
	'hierarchical'               => true,
	'public'                     => true,
	'show_ui'                    => true,
	'show_in_rest'        		 => true,
	'show_admin_column'          => true,
	'show_in_nav_menus'          => true,
	'show_tagcloud'              => true,
);
register_taxonomy( 'place-category', array( 'places' ), $args );

$labels = array(
	'name'                       => 'Age Groups',
	'singular_name'              => 'Age Group',
	'menu_name'                  => 'Age Groups',
	'all_items'                  => 'All Age Groups',
	'parent_item'                => 'Parent Age Group',
	'parent_item_colon'          => 'Parent Age Group:',
	'new_item_name'              => 'New Age Group Name',
	'add_new_item'               => 'Add New Age Group',
	'edit_item'                  => 'Edit Age Group',
	'update_item'                => 'Update Age Group',
	'view_item'                  => 'View Age Group',
	'separate_items_with_commas' => 'Separate Age Groups with commas',
	'add_or_remove_items'        => 'Add or remove Age Group',
	'choose_from_most_used'      => 'Choose from the most used',
	'popular_items'              => 'Popular Age Groups',
	'search_items'               => 'Search Age Groups',
	'not_found'                  => 'Not Found',
);
$args = array(
	'labels'                     => $labels,
	'hierarchical'               => true,
	'public'                     => true,
	'show_ui'                    => true,
	'show_in_rest'        		 => true,
	'show_admin_column'          => true,
	'show_in_nav_menus'          => true,
	'show_tagcloud'              => true,
	'rest_base'           		 => 'age-groups',
    'rest_controller_class' 	 => 'WP_REST_Terms_Controller'
);
register_taxonomy( 'age-group', array( 'activities' ), $args );

$labels = array(
	'name'                       => 'Place Features',
	'singular_name'              => 'Place Feature',
	'menu_name'                  => 'Place Features',
	'all_items'                  => 'All Place Features',
	'parent_item'                => 'Parent Place Feature',
	'parent_item_colon'          => 'Parent Place Feature:',
	'new_item_name'              => 'New Place Feature Name',
	'add_new_item'               => 'Add New Place Feature',
	'edit_item'                  => 'Edit Place Feature',
	'update_item'                => 'Update Place Feature',
	'view_item'                  => 'View Place Feature',
	'separate_items_with_commas' => 'Separate Place Features with commas',
	'add_or_remove_items'        => 'Add or remove Place Feature',
	'choose_from_most_used'      => 'Choose from the most used',
	'popular_items'              => 'Popular Place Features',
	'search_items'               => 'Search Place Features',
	'not_found'                  => 'Not Found',
);
$args = array(
	'labels'                     => $labels,
	'hierarchical'               => true,
	'public'                     => true,
	'show_ui'                    => true,
	'show_admin_column'          => true,
	'show_in_nav_menus'          => true,
	'show_tagcloud'              => true,
);
register_taxonomy( 'place-features', array( 'places' ), $args );

$labels = array(
	'name'                       => 'Media Categories',
	'singular_name'              => 'Media Category',
	'menu_name'                  => 'Media Categories',
	'all_items'                  => 'All Media Categories',
	'parent_item'                => 'Parent Media Category',
	'parent_item_colon'          => 'Parent Media Category:',
	'new_item_name'              => 'New Media Category Name',
	'add_new_item'               => 'Add New Media Category',
	'edit_item'                  => 'Edit Media Category',
	'update_item'                => 'Update Media Category',
	'view_item'                  => 'View Media Category',
	'separate_items_with_commas' => 'Separate Media Categories with commas',
	'add_or_remove_items'        => 'Add or remove Media Category',
	'choose_from_most_used'      => 'Choose from the most used',
	'popular_items'              => 'Popular Media Categories',
	'search_items'               => 'Search Media Categories',
	'not_found'                  => 'Not Found',
);
$args = array(
	'labels'                     => $labels,
	'hierarchical'               => true,
	'public'                     => true,
	'show_ui'                    => true,
	'show_admin_column'          => true,
	'show_in_nav_menus'          => false,
	'show_tagcloud'              => true,
);
register_taxonomy( 'media-categories', array( 'attachment' ), $args );

/*-----  ALLOW EXCERPT ON PAGES -------*/
add_post_type_support( 'page', 'excerpt' );

/*-----  ALLOW TERM SORT ORDER -------*/
function wpcf_filter_terms_order( $orderby, $query_vars, $taxonomies ) {
    return $query_vars['orderby'] == 'term_order' ? 'term_order' : $orderby;
}

add_filter( 'get_terms_orderby', 'wpcf_filter_terms_order', 10, 3 );

/*-----SORT BY ALPHA IF PLACE ARCHIVE-----*/
add_action( 'pre_get_posts', 'my_change_sort_order');
    function my_change_sort_order($query){
        if(is_post_type_archive( 'places' )):
         //If you wanted it for the archive of a custom post type use: is_post_type_archive( $post_type )
           //Set the order ASC or DESC
           $query->set( 'order', 'ASC' );
           //Set the orderby
           $query->set( 'orderby', 'title' );
        endif;
    };

/*---custom order by Post Type for search results------*/
add_filter( 'posts_orderby', 'order_search_by_posttype', 10, 2 );
function order_search_by_posttype( $orderby, $wp_query ){
    if( ! $wp_query->is_admin && $wp_query->is_search ) :
        global $wpdb;
        $orderby =
            "
            CASE WHEN {$wpdb->prefix}posts.post_type = 'activities' THEN '1'
                 WHEN {$wpdb->prefix}posts.post_type = 'post' THEN '2'
                 WHEN {$wpdb->prefix}posts.post_type = 'page' THEN '3'
                 WHEN {$wpdb->prefix}posts.post_type = 'places' THEN '4'
                 WHEN {$wpdb->prefix}posts.post_type = 'kba-links' THEN '5'
            ELSE {$wpdb->prefix}posts.post_type END ASC,
            {$wpdb->prefix}posts.post_title ASC";
    endif;
    return $orderby;
}


/*----CREATE "SLUG" FROM STRING ----*/
//Creates "slug" for URL clarity, has no real function
function slugifyText($string) {
    //Lower case everything
    $string = strtolower($string);
    //Make alphanumeric (removes all other characters)
    $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
    //Clean up multiple dashes or whitespaces
    $string = preg_replace("/[\s-]+/", " ", $string);
    //Convert whitespaces and underscore to dash
    $string = preg_replace("/[\s_]/", "-", $string);
    return $string;
}


/*-------CHANGE GF SPINNER------*/
add_filter("gform_ajax_spinner_url_2", "spinner_url_2", 10, 2);
function spinner_url_2($image_src, $form){
    return  get_stylesheet_directory_uri() . '/images/LogoAnimation_icon.gif' ;
}
add_filter("gform_ajax_spinner_url_1", "spinner_url_1", 10, 2);
function spinner_url_1($image_src, $form){
    return  get_stylesheet_directory_uri() . '/images/white-spinner.gif' ;
}

/*------- GO TO TOP ON GFORM SUBMISSION ---------*/
add_filter("gform_confirmation_anchor_2",  '__return_true');
add_filter("gform_confirmation_anchor_3", '__return_true');
add_filter("gform_confirmation_anchor_4", '__return_true');


// Edit Admin css
function my_custom_admin_styles() {
   ?>
        <style type="text/css">
            .admin-hidden {display:none;}
         </style>
    <?php
}
add_action('admin_head', 'my_custom_admin_styles');


// offset the main query on the main pages
function tutsplus_offset_main_query ( $query ) {
    if ( $query->is_main_query() && $query->is_posts_page && !$query->is_paged() && !is_admin()  ) {
        $query->set( 'offset', '1' );
    }
    if ( $query->is_main_query() && $query->is_posts_page && $query->is_paged() && !is_admin()  ) {
        $ppp = get_option('posts_per_page');
        $offset = 1 ;
        $page_offset = $offset + ( ($query->query_vars['paged']-1) * $ppp );
        $query->set( 'offset', $page_offset );
    }
 }
add_action( 'pre_get_posts', 'tutsplus_offset_main_query' );


/*---------- PAGINATION ------------*/
function fellowtuts_wpbs_pagination($pages = '', $range = 2)
{
	$showitems = ($range * 2) + 1;
	global $paged;
	if(empty($paged)) $paged = 1;
	if($pages == '')
	{
		global $wp_query;
		$pages = $wp_query->max_num_pages;

		if(!$pages)
			$pages = 1;
	}

	if(1 != $pages)
	{
	    echo '<nav aria-label="Page navigation" role="navigation">';
        echo '<span class="sr-only">Page navigation</span>';
        echo '<ul class="pagination justify-content-center ft-wpbs">';

        echo '<li class="page-item disabled hidden-md-down d-none d-lg-block"><span class="page-link">Page '.$paged.' of '.$pages.'</span></li>';

	 	if($paged > 2 && $paged > $range+1 && $showitems < $pages)
			echo '<li class="page-item"><a class="page-link" href="'.get_pagenum_link(1).'" aria-label="First Page">&laquo;<span class="hidden-sm-down d-none d-md-block"> First</span></a></li>';

	 	if($paged > 1 && $showitems < $pages)
			echo '<li class="page-item"><a class="page-link" href="'.get_pagenum_link($paged - 1).'" aria-label="Previous Page">&lsaquo;<span class="hidden-sm-down d-none d-md-block"> Previous</span></a></li>';

		for ($i=1; $i <= $pages; $i++)
		{
		    if (1 != $pages &&( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems ))
				echo ($paged == $i)? '<li class="page-item active"><span class="page-link"><span class="sr-only">Current Page </span>'.$i.'</span></li>' : '<li class="page-item"><a class="page-link" href="'.get_pagenum_link($i).'"><span class="sr-only">Page </span>'.$i.'</a></li>';
		}

		if ($paged < $pages && $showitems < $pages)
			echo '<li class="page-item"><a class="page-link" href="'.get_pagenum_link($paged + 1).'" aria-label="Next Page"><span class="hidden-sm-down d-none d-md-block">Next </span>&rsaquo;</a></li>';

	 	if ($paged < $pages-1 &&  $paged+$range-1 < $pages && $showitems < $pages)
			echo '<li class="page-item"><a class="page-link" href="'.get_pagenum_link($pages).'" aria-label="Last Page"><span class="hidden-sm-down d-none d-md-block">Last </span>&raquo;</a></li>';

	 	echo '</ul>';
        echo '</nav>';
        //echo '<div class="pagination-info mb-5 text-center">[ <span class="text-muted">Page</span> '.$paged.' <span class="text-muted">of</span> '.$pages.' ]</div>';
	}
}