import { body } from 'express-validator';

export const tourValidation = [
  body('tourData')
    .custom((value, { req }) => {
      let tourData;
      try {
        tourData = JSON.parse(value);
      } catch (error) {
        throw new Error('Invalid tour data format');
      }

      if (!tourData.title) throw new Error('Title is required');
      if (!tourData.category) throw new Error('Category is required');
      if (!tourData.location) throw new Error('Location is required');
      if (!tourData.days || tourData.days < 1) throw new Error('Valid number of days is required');
      if (!tourData.groupSize) throw new Error('Group size is required');
      if (!tourData.difficulty) throw new Error('Difficulty is required');
      if (!tourData.price || tourData.price < 0) throw new Error('Valid price is required');
      if (!tourData.bestSeason) throw new Error('Best season is required');
      if (!tourData.description) throw new Error('Description is required');
      if (!tourData.itineraries || !tourData.itineraries.length) throw new Error('At least one itinerary is required');

      // Validate each itinerary
      tourData.itineraries.forEach((itinerary, index) => {
        if (!itinerary.day) throw new Error(`Day number is required for itinerary ${index + 1}`);
        if (!itinerary.title) throw new Error(`Title is required for itinerary ${index + 1}`);
        if (!itinerary.description) throw new Error(`Description is required for itinerary ${index + 1}`);
      });

      return true;
    })
];

export const blogValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author is required')
];

export const inquiryValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required')
];

export const contactValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
]; 