const ENDPOINT = process.env.ENDPOINT!

export const searchImages = async (page: number, search: string) =>
  fetch(`${ENDPOINT}/images?page=${page}&search=${encodeURIComponent(search)}`).then(res => res.json())