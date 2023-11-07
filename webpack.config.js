const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: './dist/index.js'
    },
    watch: true,
    plugins: [
        new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        port: 3000,
        files: ['./dist/*.html'],
        server: { baseDir: ['dist'] }
        })
    ]
}