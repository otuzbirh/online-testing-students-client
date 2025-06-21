import React from "react";
import { Chart } from "react-chartjs-2";

const QuizAnalysis = ({ quizResults }) => {
  // AI analysis of student performance patterns
  const analyzePerformance = (results) => {
    const strengths = results.filter((q) => q.isCorrect).map((q) => q.topic);
    const weaknesses = results.filter((q) => !q.isCorrect).map((q) => q.topic);

    return {
      strongTopics: [...new Set(strengths)],
      weakTopics: [...new Set(weaknesses)],
      recommendedTopics: calculateRecommendedTopics(weaknesses),
    };
  };

  const { strongTopics, weakTopics, recommendedTopics } =
    analyzePerformance(quizResults);

  return (
    <div>
      <h3>AI Performance Analysis</h3>
      <div>Strong Areas: {strongTopics.join(", ")}</div>
      <div>Areas for Improvement: {weakTopics.join(", ")}</div>
      <div>Recommended Study Topics: {recommendedTopics.join(", ")}</div>
      <Chart data={generatePerformanceChart(quizResults)} />
    </div>
  );
};
