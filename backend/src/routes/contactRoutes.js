import express from 'express';
import { createContact } from '../controllers/contactController.js';
import { contactValidation } from '../middlewares/validation.js';
import { handleValidationErrors } from '../middlewares/errorHandler.js';

const router = express.Router();

router.post('/', contactValidation, handleValidationErrors, createContact);

export default router; 