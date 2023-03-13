const form = document.querySelector('form');
const songInfo = document.querySelector('#song-info');

form.addEventListener('submit', function(e) {
	e.preventDefault();

	const firstName = document.querySelector('#first-name').value;
	const lastName = document.querySelector('#last-name').value;
	const birthDate = document.querySelector('#birth-date').value;

	// Use the Spotify API to search for a random song
	fetch(`https://api.spotify.com/v1/search?q=${firstName}+${lastName}+${birthDate}&type=track&limit=50`, {
		headers: {
			'Authorization': 'Bearer BQBu9pzI2GDpn6FpEMDDEPdFvyAYswfADnDfBj-wwZTHzdlpSRCCH96YwEElCrMx3vUKXbCUmtg9jbiHhNRD2upgNFrbJV1dAS1IsLxJNWQ19mniQYq2'
		}
	})
	.then(response => response.json())
	.then(data => {
		// Select a random song from the search results
		const songs = data.tracks.items;
		const randomSong = songs[Math.floor(Math.random() * songs.length)];

		// Display the song information to the user
		songInfo.innerHTML = `
			<h2>${randomSong.name}</h2>
			<p>by ${randomSong.artists[0].name}</p>
			<img src="${randomSong.album.images[0].url}">
		`;
		songInfo.style.display = 'block';
	})
	.catch(error => console.log(error));
});
