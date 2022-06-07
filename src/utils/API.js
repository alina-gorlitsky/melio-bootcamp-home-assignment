// Hint: you can copy the URL to a browser and see the result
const FETCH_CANDIDATES_URL =
  "https://randomuser.me/api/?seed=abcd&nat=us,dk,fr,gb&results=50&page=1";

export const fetchCandidates = async () => {
  let responseJson;
  try {
    const response = await fetch(FETCH_CANDIDATES_URL);
    responseJson = await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
  return responseJson.results;
};
