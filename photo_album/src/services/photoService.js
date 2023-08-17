import axios from 'axios';

export default function photoService() {

  const client = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async function getPhoto(id) {
    try {
      return await client.get(`/photos?id=${id}`);
    } catch (error) {
      // Log error here
    }
  }

  return { getPhoto };
}