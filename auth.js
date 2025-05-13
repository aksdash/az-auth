require('dotenv').config()
const axios= require('axios')
const jwt = require('jsonwebtoken')

async function getAzureToken(){
    const url = `https://login.microsoftonline.com/${process.env.AZ_TENANT_ID}/oauth2/v2.0/token`;
    const header = {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }
    const data = `client_id=${process.env.AZ_CLIENT_ID}&scope=${encodeURIComponent(process.env.SCOPE)}&client_secret=${process.env.AZ_CLIENT_SECRET}&grant_type=client_credentials`;

    try {
        const response = await axios.post(url, data, {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        
        console.log('Access Token:', response.data.access_token);
        return response.data.access_token;
    }catch(err){
        console.error('Error fetching token:', err);
    }
}

getAzureToken()