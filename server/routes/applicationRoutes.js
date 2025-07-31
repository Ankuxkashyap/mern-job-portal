import express from 'express';
import {
  applyToJob,
  getJobApplicants,
} from '../controllers/applicationController.js';
import { protect, isCandidate, isEmployer } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
import { updateApplicationStatus } from '../controllers/applicationController.js';


const router = express.Router();

router.route('/:jobId/apply').post(protect, isCandidate, upload.single('resume'), applyToJob);

router.route('/:jobId/applicants').get(protect, isEmployer, getJobApplicants);
router
  .route('/:jobId/applicants/:applicationId')
  .put(protect, isEmployer, updateApplicationStatus);

export default router; 
