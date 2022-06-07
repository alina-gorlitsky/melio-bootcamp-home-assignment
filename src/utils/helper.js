export const getPersistentCandidatesData = () => {
  return JSON.parse(localStorage.getItem("candidates"));
};

export const setPersistentCandidatesData = (candidates) => {
  localStorage.setItem("candidates", JSON.stringify(candidates));
};

export const transformCandidatesData = (data) => {
  let transformedCandidates = [];

  data.forEach((dataElement) => {
    transformedCandidates.push({
      firstName: dataElement.name.first,
      lastName: dataElement.name.last,
      email: dataElement.email,
      city: dataElement.location.city,
      country: dataElement.location.country,
      picture: dataElement.picture,
      uuid: dataElement.login.uuid,
      isFavorite: false,
      isPreferred: ["United Kingdom", "United States"].includes(dataElement.location.country)
    });
  });

  transformedCandidates = sortCandidatesAlphabetically(transformedCandidates);
  transformedCandidates = groupByFirstLetter(transformedCandidates);
  setPersistentCandidatesData(transformedCandidates);

  return transformedCandidates;
};

export const candidatesToArray = (candidates) => {
  const candidatesArray = [];
  for (const key in candidates) {
    candidates[key].map((candidate) => candidatesArray.push(candidate));
  }
  return candidatesArray;
};

const sortCandidatesAlphabetically = (data) => {
  return data.sort((a, b) => {
    a = a.firstName.toUpperCase();
    b = b.firstName.toUpperCase();
    return a < b ? -1 : a > b ? 1 : 0;
  });
};

export const groupByFirstLetter = (data) => {
  const grouped = data.reduce((result, dataItem) => {
    const key = dataItem.firstName.charAt(0).toUpperCase();
    const keyStore = result[key] || (result[key] = []);
    keyStore.push(dataItem);

    return result;
  }, {});

  return grouped;
};
