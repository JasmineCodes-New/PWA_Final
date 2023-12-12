const path = require('path');

module.exports = {
    entry: './js/app.js', // Entry point of your application
    output: {
        filename: 'bundle.js', // Output bundle file
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    target: 'web', // Set the target to 'web' for a browser environment
};

