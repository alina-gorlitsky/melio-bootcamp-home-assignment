import React, { useEffect, useState } from "react";
import "./Home.css";
import { fetchCandidates } from "../../utils/API.js";
import {
  candidatesToArray,
  getPersistentCandidatesData,
  transformCandidatesData
} from "../../utils/helper.js";
import { Card } from "../../components/Card/Card";

export const Home = () => {
  // once you populated candidates variable with data
  // search online how to "render an array of items in react" and add your implementation below (line 41)
  // to update the candidates variable, you need to use setCandidatesFunction
  // Note - every time you use this function, it will auto refresh your Home page, we call it in React - "Render".
  const [candidates, setCandidatesFunction] = useState([]);

  // this is "React Hook", a function that will be called ONCE, on every page load
  useEffect(() => {
    runOnHomePageLoad();
  }, []);

  const runOnHomePageLoad = async () => {
    // once you will succeed getting the data, make it persistent as required.
    // if the data is already fetched and persistent - don't fetch it again, use the condition below
    const data = getPersistentCandidatesData();
    if (data) {
      setCandidatesFunction(data);
    } else {
      const fetchedData = await fetchCandidates();
      const transformedData = transformCandidatesData(fetchedData);

      //this function will save a "React State" and allow you to use the data via candidates variable outside.
      setCandidatesFunction(transformedData);
    }
  };

  return (
    <div id='home'>
      <div className='home-headings'>
        <div className='home-title'>Firm's candidates</div>
        <div className='home-subtitle'>Alina Gorlitsky</div>
      </div>
      <div className='candidates-list'>
        {candidatesToArray(candidates).map((candidate) => (
          <Card key={candidate.uuid} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};
