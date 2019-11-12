<?php 
/**
 * Plugin Name: Janky plugin
 */


function janky_plugin_init()
{
    function janky_plugin_shortcode($atts = [], $content = null)
    {
        $attrs = shortcode_atts( array(
            "target_time" => "0",
            "color" => "#1E88E5"
            )
        , $atts);
        // do something to $content
 
        $attrs['target_time'] = esc_html($attrs['target_time']);
        $attrs['color'] = esc_html($attrs['color']);

        // always return
        return "
            <div class='janky_countdown' endtime='{$attrs['target_time']}' bgcolor='{$attrs['color']}'></div>
        ";
    }
    add_shortcode('janky', 'janky_plugin_shortcode');
}

function janky_enqueue_scripts() {
    wp_enqueue_script("janky_moment","https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js");
    wp_enqueue_script("janky_src",plugins_url( 'janky.js', __FILE__ ));
    wp_enqueue_style("janky_css",plugins_url( 'janky_style.css', __FILE__ ));
}
add_action('init', 'janky_plugin_init');
add_action('wp_enqueue_scripts',"janky_enqueue_scripts");
?>