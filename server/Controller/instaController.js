// Controller/instagramController.js
const axios = require('axios');

// Load credentials from environment
const ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;
const IG_USER_ID = process.env.IG_USER_ID;

exports.getInstagramFeed = async (req, res) => {
  try {
    // console.log('IG_USER_ID:', IG_USER_ID);
    // console.log('ACCESS_TOKEN:', ACCESS_TOKEN?.substring(0, 10) + '...');

    const response = await axios.get(`https://graph.facebook.com/v20.0/${IG_USER_ID}/media`, {
      params: {
        fields: 'id,caption,media_type,media_url,permalink,timestamp',
        access_token: ACCESS_TOKEN,
      }
    });

    res.status(200).json(response.data.data);
  } catch (error) {
    console.error("Instagram fetch failed:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Instagram feed' });
  }
};
