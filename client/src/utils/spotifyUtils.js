export const syncData = async (accessToken) => {
  if (!accessToken) {
    alert("Please log in first!");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/syncWithSpotify?access_token=${accessToken}`
    );
    const data = await response.json();
    console.log(data);
    return data; // Return the data for further use
  } catch (error) {
    console.error("Error syncing data:", error);
    throw error; // Throw the error to handle it in the calling function
  }
};

export const fetchPlaylists = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/playlists");
    const data = await response.json();
    // setPlaylists(data); // Update the playlists state
    return data; // Return the data for further use
  } catch (error) {
    console.error("Error fetching playlists:", error);
  }
};

export const fetchSongs = async (songIds) => {
  try {
    const songDetails = await Promise.all(
      songIds.map(async (songId) => {
        const response = await fetch(
          `http://localhost:3000/api/songs/${songId}`
        ); // Replace with your backend API endpoint
        const data = await response.json();
        return { id: songId, ...data };
      })
    );

    return songDetails;
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
};
