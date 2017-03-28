import base64 from 'base-64' // importez la dépendance tout juste installée

// Appel json
const rootEndpoint = 'https://jsonplaceholder.typicode.com/posts'

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export const getAllPlaylists = () =>
  fetch(`${rootEndpoint}`, { headers })
     .then((response) => response.json())
     .then((responseData) => {
        return responseData;
      })
