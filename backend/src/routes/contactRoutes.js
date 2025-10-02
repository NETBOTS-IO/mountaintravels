import express from 'express';
import { createContact, getContacts } from '../controllers/contactController.js';
import { contactValidation } from '../middlewares/validation.js';
import { handleValidationErrors } from '../middlewares/errorHandler.js';

const router = express.Router();

router.post('/add', contactValidation, handleValidationErrors, createContact);
router.get('/',  getContacts);

export default router; 