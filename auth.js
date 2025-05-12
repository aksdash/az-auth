require('dotenv').config()
const axios= require('axios')

async function getAzureToken(){
    const url = `https://login.microsoftonline.com/${process.env.AZ_TENANT_ID}/oauth2/v2.0/token`;
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.AZ_CLIENT_ID);
    params.append('client_secret', process.env.AZ_CLIENT_SECRET);
    params.append('scope', process.env.SCOPE);
    params.append('Content-Type','application/x-www-form-urlencoded')
    console.log(url,params )

    try {
        const response = await axios.post(url,params)
        console.log('Access Token:', response.data.access_token);
        return response.data.access_token;
    }catch(err){
        console.error('Error fetching token:', err);
    }
}

getAzureToken()