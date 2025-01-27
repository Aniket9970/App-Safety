export interface App {
  id: string;
  name: string;
  developer: string;
  category: string;
  status: 'Verified' | 'Suspicious' | 'Fraudulent';
  riskScore: number;
  description: string;
  termsAnalysis: string;
  skillBasedScore: number;
  regulatoryCompliance: boolean;
  registeredAuthorities: string[];
  created_at: string;
}

export interface Review {
  id: string;
  app_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  userName: string;
}

export interface AppReview {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  isReportedFraud: boolean;
  timestamp: string;
}

export interface AppDetails {
  id?: string;
  name: string;
  url: string;
  category: string;
  description: string;
  developer: string;
  riskScore?: number;
  verificationStatus?: 'Verified' | 'Suspicious' | 'Fraudulent';
  reviews?: Review[];
  averageRating?: number;
  totalReports?: number;
}

export interface AnalysisResult {
  riskScore: number;
  warnings: string[];
  authenticity: {
    status: 'Verified' | 'Suspicious' | 'Fraudulent';
    reasons: string[];
  };
  termsAnalysis?: {
    hasWithdrawalRestrictions: boolean;
    hasHiddenFees: boolean;
    hasClearTerms: boolean;
  };
}