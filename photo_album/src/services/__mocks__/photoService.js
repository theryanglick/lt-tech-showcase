// Mock up of the photoService function for unit testing
export default function photoService() {

  async function getPhoto() {
    return Promise.resolve({
      data: [
        {
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
      }],
    });
  }

  return { getPhoto }
}