/*
 * r.js configuration to minify and generate concatenated modules
 * Refrence for optimization process: http://requirejs.org/docs/optimization.html
 * Terminal commands for code optmimization:
 * Insatall r.js with require: $ npm install -g requirejs
 * Optimize using: $r.js -o build.js
 * For a comprehensive r.js see - https://github.com/jrburke/r.js/blob/master/build/example.build.js#L27-35
 */
({
    baseUrl: "www/js",
    mainConfigFile: 'www/js/main.js',
    name: "main",
    exclude: [
        "backbone",
        "jquery",
        "underscore",
        "bootstrap",
        "cryptojs",
        "masonry",
        "moment",
    ],
    out: "www/main-built.js",
})