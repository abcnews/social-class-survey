import type { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'contacts',
    title: 'Social contacts',
    hint: 'Below is a list of occupations. If you know anyone socially who works in each occupation, select that box. You may select as many as apply.',
    options: [
      'Secretary',
      'Nurse',
      'Teacher',
      'Cleaner',
      'University lecturer',
      'Artist',
      'Electrician',
      'Office manager',
      'Solicitor',
      'Farm worker',
      'Chief executive',
      'Software designer',
      'Call centre worker',
      'Postal worker',
      'Scientist',
      'Truck driver',
      'Accountant',
      'Shop assistant',
      'None of these'
    ],
    isMultiple: true,
    noneIndex: 18
  },
  {
    id: 'activities',
    title: 'Cultural activities',
    hint: 'Below is a list of cultural activities. Please select any that you have done in the last 12 months.',
    options: [
      'Gone to the opera',
      'Listened to jazz',
      'Listened to rock/indie',
      'Gone to gigs',
      'Played video games',
      'Watched sports',
      'Seen plays or gone to the theatre',
      'Exercised/gone to gym',
      'Used Facebook/Twitter',
      'Socialised at home',
      'Gone to museums/galleries',
      'Listened to classical music',
      'Done arts and crafts',
      'Watched dance or ballet',
      'Listened to hip-hop/rap',
      'None of these'
    ],
    isMultiple: true,
    noneIndex: 15
  },
  {
    id: 'income',
    title: 'What is your total annual household income before tax or anything else is taken out?',
    options: [
      'Less than $20,000',
      '$20,000 to less than $40,000',
      '$40,000 to less than $60,000',
      '$60,000 to less than $80,000',
      '$80,000 to less than $100,000',
      '$100, 000 to less than $150,000',
      '$150,000 or more'
    ]
  },
  {
    id: 'property',
    title: 'What would you say is the approximate value of all property owned or mortgaged by you?',
    options: ['Less than $250,000', '$250,000 - $500,000', '$500,000 - $1 million', '$1 million or more']
  },
  {
    id: 'savings',
    title: 'Roughly how much do you have in savings?',
    options: [
      'Less than $20,000',
      '$20,000 to less than $40,000',
      '$40,000 to less than $60,000',
      '$60,000 to less than $80,000',
      '$80,000 to less than $100,000',
      '$100,000 to less than $150,000',
      '$150,000 or more'
    ]
  }
];

export const KNOWN_SES = [
  32.9, // Secretary
  80.7, // Nurse
  85.3, // Teacher
  19.4, // Cleaner
  92.3, // Lecturer
  67.0, // Artist
  39.6, // Electrician
  49.3, // Office manager
  90.7, // Solicitor
  11.0, // Farm worker
  78.2, // Chief executive
  81.3, // Software designer
  38.3, // Call centre worker
  37.7, // Postal worker
  86.4, // Scientist
  14.5, // Truck driver
  83.7, // Accountant
  27.8, // Shop assistant
  0 // None
];

export const HIGHBROW_ACTIVITY_INDICES = [
  '0', // Opera
  '6', // Theatre
  '11', // Classical
  '13' // Dance
];

export const EMERGING_ACTIVITY_INDICES = [
  '2', // Rock / Indie
  '3', // Gigs
  '4', // Video games
  '5', // Sports
  '7', // Exercise / Gym
  '8', // Facebook / Twitter
  '14' // Hiphop
];

export const DATA_LOOKUP_ENDPOINT =
  'https://www.abc.net.au/dat/news/interactives/2015/10/anu-social-class-analysis/lookup-df4-2640/';

export const CONCLUSIONS = [
  {
    name: 'Established affluent',
    poppct: 14,
    desc: 'Resembling an older generation of emergent affluent class Australians, the established affluent class possess aboveaverage rates of economic, cultural and social capital.'
  },
  {
    name: 'Mobile middle',
    poppct: 25,
    desc: 'Members of the mobile middle class come from similar backgrounds to those of the established middle class, but are distinguished by higher levels of educational attainment and consequently higher rates of household income.'
  },
  {
    name: 'Emergent affluent',
    poppct: 11,
    desc: 'The emergent affluent class shares many of the characteristics of the mobile middle class, with two key differences: they are younger, and in more of a hurry'
  },
  {
    name: 'Established middle',
    poppct: 26,
    desc: 'True to their name, the established middle class sits squarely in the middle of the five classes in terms of income, assets, social and cultural capital, educational attainment and intergenerational advantage.'
  },
  {
    name: 'Established working',
    poppct: 24,
    desc: 'Established working class Australians are the oldest group, with an average age of 66 years. They have the lowest participation in both highbrow and emerging cultural activities, the lowest social contact score and the lowest occupational prestige among their contacts.'
  }
];
