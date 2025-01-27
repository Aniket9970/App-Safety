import { AppDetails } from '../types';

// Local backend implementation
interface LocalApp {
  domain: string;
  riskScore: number;
  verificationStatus: 'Verified' | 'Suspicious' | 'Fraudulent';
  warnings: string[];
  verificationReasons: string[];
  termsAnalysis: {
    hasWithdrawalRestrictions: boolean;
    hasHiddenFees: boolean;
    hasClearTerms: boolean;
  };
}

const localApps = new Map<string, LocalApp>();

export const localBackend = {
  findApp: (domain: string) => {
    return localApps.get(domain);
  },
  
  saveApp: (domain: string, data: LocalApp) => {
    localApps.set(domain, data);
  }
};