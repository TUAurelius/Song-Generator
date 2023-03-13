// Function to get a random song from the user's top tracks
async function getRandomSong(spotifyApi, userId) {
    // Get the user's top tracks
    const { body: { items } } = await spotifyApi.getMyTopTracks({ limit: 50, time_range: 'medium_term' });
  
    // Choose a random track from the user's top tracks
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomTrack = items[randomIndex];
  
    // Get the track's name, artist, and preview URL
    const { name, artists, preview_url } = randomTrack;
    const artistNames = artists.map(artist => artist.name).join(', ');
  
    // Construct a message to describe the user based on the random song
    const message = `Based on your information, we've chosen the song "${name}" by ${artistNames} to describe you.`;
  
    // Return the message and the preview URL of the random song
    return { message, previewUrl: preview_url };
  }
  
  // Initialize the Spotify API wrapper
  const spotifyApi = new SpotifyWebApi({
    clientId: 'a16f0560155d4863af108107a292da7c',
    clientSecret: 'f0f581c522b6466292f5ba1b01099eda',
    redirectUri: 'http://127.0.0.1:5500/callback'
  });
  
  // Get a new access token using the client credentials flow
  async function getAccessToken() {
    try {
      const data = await spotifyApi.clientCredentialsGrant();
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so it's used in future requests
      spotifyApi.setAccessToken(data.body['access_token']);
    } catch (err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  }
  
  // Call the function to get a new access token
  getAccessToken();
  
  // Add event listener to the form submission
  const form = document.querySelector('form');
  form.addEventListener('submit', async event => {
    event.preventDefault();
  
    // Get the user's input values
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const birthDate = document.querySelector('#birthDate').value;
  
    // Call the function to get a random song based on the user's input
    const { message, previewUrl } = await getRandomSong(spotifyApi, 'cyrusthepersian');
  
    // Update the message on the page with the random song info
    const messageElement = document.querySelector('#message');
    messageElement.textContent = message;
  
    // Create a link to the preview URL of the random song
    const linkElement = document.createElement('a');
    linkElement.href = previewUrl;
    linkElement.textContent = 'Listen to the song';
    messageElement.appendChild(linkElement);
  });
  