const CLIENT_ID = 'a16f0560155d4863af108107a292da7c';
const CLIENT_SECRET = 'f0f581c522b6466292f5ba1b01099eda';

fetch('https://accounts.spotify.com/api/token', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
	},
	body: 'grant_type=client_credentials'
})
.then(response => response.json())
.then(data => {
	const access_token = data.access_token;
	console.log(access_token);
})
.catch(error => console.log(error));
