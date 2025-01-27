import { AppDetails, Review } from '../types';

const APPS_STORAGE_KEY = 'app_safety_apps';

// Initial app data
const initialApps: AppDetails[] = [
  {
    id: '1',
    name: 'Dream11',
    url: 'https://www.dream11.com',
    category: 'Fantasy Sports',
    riskScore: 3.5,
    verificationStatus: 'Verified',
    description: 'Fantasy sports platform for cricket, football, and other sports.',
    developer: 'Dream11',
    totalReports: 45,
    averageRating: 4.2,
    reviews: []
  },
  {
    id: '2',
    name: 'Junglee Rummy',
    url: 'https://www.jungleerummy.com',
    category: 'Gambling',
    riskScore: 7.8,
    verificationStatus: 'Suspicious',
    description: 'Online rummy platform with real money gaming.',
    developer: 'Junglee Games',
    totalReports: 156,
    averageRating: 3.1,
    reviews: []
  },
  // Add more initial apps...
];

export const appStorageService = {
  initializeStorage: () => {
    if (!localStorage.getItem(APPS_STORAGE_KEY)) {
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(initialApps));
    }
  },

  getAllApps: (): AppDetails[] => {
    const apps = localStorage.getItem(APPS_STORAGE_KEY);
    return apps ? JSON.parse(apps) : [];
  },

  addApp: (app: Omit<AppDetails, 'id' | 'reviews' | 'averageRating' | 'totalReports'>): AppDetails => {
    const apps = appStorageService.getAllApps();
    const newApp: AppDetails = {
      ...app,
      id: Date.now().toString(),
      reviews: [],
      averageRating: 0,
      totalReports: 0
    };
    apps.push(newApp);
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
    return newApp;
  },

  findApp: (domain: string): AppDetails | null => {
    const apps = appStorageService.getAllApps();
    return apps.find(app => app.url.toLowerCase().includes(domain.toLowerCase())) || null;
  },

  updateApp: (id: string, updates: Partial<AppDetails>) => {
    const apps = appStorageService.getAllApps();
    const index = apps.findIndex(app => app.id === id);
    if (index !== -1) {
      apps[index] = { ...apps[index], ...updates };
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
      return apps[index];
    }
    return null;
  },

  addReview: (appId: string, review: Omit<Review, 'id' | 'app_id' | 'created_at'>) => {
    const apps = appStorageService.getAllApps();
    const appIndex = apps.findIndex(app => app.id === appId);
    
    if (appIndex !== -1 && apps[appIndex].reviews) {
      const newReview: Review = {
        ...review,
        id: Date.now().toString(),
        app_id: appId,
        created_at: new Date().toISOString()
      };
      
      apps[appIndex].reviews?.push(newReview);
      
      if (apps[appIndex].reviews) {
        const ratings = apps[appIndex].reviews.map(r => r.rating);
        apps[appIndex].averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      }
      
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
      return apps[appIndex];
    }
    return null;
  },

  saveApp: (domain: string, analysisData: any) => {
    const apps = appStorageService.getAllApps();
    const existingAppIndex = apps.findIndex(app => app.url.includes(domain));
    
    if (existingAppIndex !== -1) {
      apps[existingAppIndex] = {
        ...apps[existingAppIndex],
        riskScore: analysisData.risk_score,
        verificationStatus: analysisData.status,
      };
    }
    
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
  },

  updateApps: (apps: AppDetails[]) => {
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
  }
}; 