const fs = require('fs');

// Load environment variables from config.env if the file exists
if (fs.existsSync('config.env')) {
    require('dotenv').config({ path: './config.env' });
}

// Function to convert text to a boolean value
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

// Export the SESSION_ID environment variable
module.exports = {
    SESSION_ID: process.env.SESSION_ID || '7zIjyCKB#vdrBB6qfbxnLu6cTv3cADArBGq810AJ03abU3O_UEXU',
    MONGODB: process.env.MONGODB || "mongodb://mongo:lXeSCuCxsffPJwNIsfrAGyZxpHtmzdIJ@autorack.proxy.rlwy.net:10236",
    OMDB_API_KEY: process.env.OMDB_API_KEY || "cc1a20a7",
    READ_CMD: process.env.READ_CMD || "true",
};
