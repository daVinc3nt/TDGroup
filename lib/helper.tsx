const baseURL = "http://localhost:3000/api/posts";

export default async function getPost(id: number|null) {
  try {
    const res = await fetch(baseURL);

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    const posts = await res.json();

    if (id) {
      return posts.find((value) => value.id == id);
    }

    return posts;
  } catch (error) {
    throw error;
  }
}
