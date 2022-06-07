import React from "react";
import "./Card.css";
import { useState } from "react";
import { FavoriteIcon } from "../FavoriteIcon/FavoriteIcon";
import { setPersistentCandidatesData, getPersistentCandidatesData } from "../../utils/helper.js";

export const Card = (props) => {
  const [isFavoriteIconShown, setIsFavoriteIconShown] = useState(false);

  const handleFavoriteClick = (candidate) => {
    candidate.isFavorite = !candidate.isFavorite;
    let candidates = getPersistentCandidatesData();
    const index = candidates[candidate.firstName.charAt(0)].findIndex(
      (item) => item.uuid === candidate.uuid
    );
    candidates[candidate.firstName.charAt(0)][index] = candidate;
    setPersistentCandidatesData(candidates);
  };

  return (
    <div
      onMouseEnter={() => setIsFavoriteIconShown(true)}
      onMouseLeave={() => setIsFavoriteIconShown(false)}
      className='card'>
      <div className='candidateInfo'>
        <img
          src={props.candidate.picture.medium}
          className='candidateImage'
          alt='candidate-picture'
        />
        <div>
          <span className='fullNameAndBadge'>
            <div className='fullName'>
              <span>{props.candidate.firstName}</span>
              <span>{props.candidate.lastName}</span>
            </div>
            {props.candidate.isPreferred && <div className='preferredBadge'>Preferred</div>}
          </span>
          <div className='email'>{props.candidate.email}</div>
          <div className='location'>
            <span>{props.candidate.city},</span>
            <span>{props.candidate.country}</span>
          </div>
        </div>
      </div>
      {(isFavoriteIconShown || props.candidate.isFavorite) && (
        <div className='favoriteIcon' onClick={() => handleFavoriteClick(props.candidate)}>
          <FavoriteIcon />
        </div>
      )}
    </div>
  );
};
