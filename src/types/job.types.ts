export interface Job {
  id: string;
  title: string;
  titleAr: string;
  department: string;
  description: string;
  descriptionAr: string;
  requirements: string[];
  requirementsAr: string[];
  employmentType: 'full-time' | 'part-time' | 'contract';
  applicationDeadline?: Date;
  status: 'active' | 'closed' | 'filled';
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplication {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  cvUrl: string;
  coverLetter?: string;
  linkedInProfile?: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
  createdAt: Date;
}
