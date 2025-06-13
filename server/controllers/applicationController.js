import  Application  from '../models/applicationModel.js';
import Job from '../models/jobModel.js';

// @desc    Apply to a job
// @route   POST /api/applications/:jobId/apply
// @access  Private/Candidate
const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applicantId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const resumeUrl = req.file.path;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const alreadyApplied = await Application.findOne({ job: jobId, applicant: applicantId });

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = await Application.create({
      job: jobId,
      applicant: applicantId,
      resumeUrl,
    });

    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get applications for a job
// @route   GET /api/applications/:jobId/applicants
// @access  Private/Employer
const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to view applicants for this job' });
    }

    const applications = await Application.find({ job: jobId }).populate(
      'applicant',
      'name email'
    );

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const application = await Application.findById(req.params.applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Optional: verify employer owns the job
    if (application.job.toString() !== req.params.jobId) {
      return res.status(401).json({ message: 'Unauthorized access to application' });
    }

    application.status = status;
    const updatedApplication = await application.save();

    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
};


export { applyToJob, getJobApplicants,updateApplicationStatus };
