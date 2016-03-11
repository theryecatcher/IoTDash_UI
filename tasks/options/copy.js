/**
 * Configure copying tasks into dist version
 */
module.exports = {
    dist: {
        files: [
            {
                expand: true,
                cwd: 'public',
                src: [
                    'index.html',
                    'polymer-loader.vulcanized.html',
                    'images/*',
                    'sample-data/*',
                    'views/**',
                    'bower_components/webcomponentsjs/webcomponents-lite.js',
                    'bower_components/px/dist/px.min.js',
                    'bower_components/es6-promise/dist/es6-promise.min.js',
                    'bower_components/requirejs/require.js',
                    'bower_components/font-awesome/fonts/*',
                    'bower_components/moment/min/moment.min.js',
                    'bower_components/moment/moment.js',
                    'bower_components/polymer/**',
                    'bower_components/px-card/*',
                    'bower_components/px-card/css/*',
                    'bower_components/px-chart/px*',
                    'bower_components/px-chart/css/*',
                    'bower_components/d3/d3.js',
                    'bower_components/annotations/js/*',
                    'bower_components/annotations/css/*',
                    'bower_components/px-rangepicker/px*',
                    'bower_components/px-rangepicker/validate.html',
                    'bower_components/px-rangepicker/css/*',
                    'bower_components/highstock-release/adapters/*',
                    'bower_components/highstock-release/modules/exporting.src.js',
                    'bower_components/highstock-release/highstock.src.js',
                    'bower_components/px-typography-design/type/*'
                ],
                dest: 'dist/www/'
            }
        ]
    },
    serve: {
        files: [
            {
                expand: true,
                cwd: 'public',
                src: ['polymer-loader.html'],
                rename: function (src, dest) {
                    return 'public/polymer-loader.vulcanized.html';
                }
            }
        ]
    }
};
