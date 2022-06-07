import React, { useEffect, useState } from "react";
import "./Favorites.css";
import {
  candidatesToArray,
  getPersistentCandidatesData,
  groupByFirstLetter
} from "../../utils/helper.js";
import { Card } from "../../components/Card/Card";

export const Favorites = () => {
  const [favorites, setFavoritesFunction] = useState([]);

  useEffect(() => {
    runOnFavoritesPageLoad();
  }, []);

  const runOnFavoritesPageLoad = async () => {
    let favoriteCandidates = candidatesToArray(getPersistentCandidatesData()).filter(
      (candidate) => candidate.isFavorite
    );
    favoriteCandidates = groupByFirstLetter(favoriteCandidates);
    if (favoriteCandidates) {
      setFavoritesFunction(favoriteCandidates);
    }
  };

  return (
    <div id='favorites'>
      <div className='favorite-headings'>
        <div className='favorites-title'>Favorite candidates</div>
        <div className='favorites-subtitle'>Alina Gorlitsky</div>
      </div>
      <div className='favorites-list'>
        {candidatesToArray(favorites).length > 0 ? (
          [
            candidatesToArray(favorites).map((candidate) => (
              <Card key={candidate.uuid} candidate={candidate} />
            ))
          ]
        ) : (
          <div className='noFavoritesMessage'>You don't have any favorite candidates yet</div>
        )}
      </div>
    </div>
  );
};
