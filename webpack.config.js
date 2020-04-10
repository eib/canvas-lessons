const path = require('path');
const buildAndWatch = process.env.WATCH;

module.exports = {
    mode: 'development',
    watch: !!buildAndWatch,
    entry: {
        graph: './src/demos/graph/main.js',
        snowflake: './src/demos/snowflake/main.js',
        static: './src/demos/static/main.js',        
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/i,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  esModule: false,
                },
            },
        ],
    },
};
