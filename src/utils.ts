import {
  CONCLUSIONS,
  DATA_LOOKUP_ENDPOINT,
  EMERGING_ACTIVITY_INDICES,
  HIGHBROW_ACTIVITY_INDICES,
  KNOWN_SES
} from './constants';
import type { Answers, Query, Result } from './types';

function bin(value: number, thresholds: number[]) {
  let i: number;

  for (i = 0; i < thresholds.length; i++) {
    if (value < thresholds[i]) {
      return i + 1;
    }
  }

  return i + 1;
}

export const answersToQuery = (answers: Answers): Query => {
  const known = bin((answers.contacts as string[]).length, [4.5, 6.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 15.5]);
  const highbrow = bin(
    (answers.activities as string[]).filter(index => HIGHBROW_ACTIVITY_INDICES.includes(index)).length,
    [1.5, 2.5, 3.5]
  );
  const emerging = bin(
    (answers.activities as string[]).filter(index => EMERGING_ACTIVITY_INDICES.includes(index)).length,
    [3.5, 4.5, 6.5]
  );
  const income = bin(+(answers.income as string), [1.8, 3.8, 4.35, 5.7]);
  const assets = bin(+(answers.property as string) + +(answers.savings as string) + 2, [4.5, 5.5]);
  const knownses = bin(
    (answers.contacts as string[]).reduce((memo, index) => memo + KNOWN_SES[index], 0),
    [222.5, 341.5, 438.5, 522.5, 590.5, 650.5, 713.5, 784.5, 877.5]
  );

  return {
    known,
    highbrow,
    emerging,
    income,
    assets,
    knownses
  };
};

export const getDataLookupURL = (query: Query) => `${DATA_LOOKUP_ENDPOINT}${Object.values(query).join('-')}.csv`;

function indexOfMax(input: number[]) {
  let max = -Infinity;
  let index = -1;

  for (let i = 0; i < input.length; i++) {
    if (input[i] > max) {
      max = input[i];
      index = i;
    }
  }

  return index;
}

export const fetchResult = (query: Query) =>
  fetch(getDataLookupURL(query))
    .then(response => response.text())
    .then(csv => {
      const probabilities = csv
        .split('\n')
        .map(function (d) {
          return +d.split(',')[1];
        })
        .slice(1, 6);
      const classIndex = indexOfMax(probabilities);

      return {
        scores: Object.values(query),
        probabilities,
        classIndex,
        conclusion: classIndex > -1 ? CONCLUSIONS[classIndex] : null
      } as Result;
    });
