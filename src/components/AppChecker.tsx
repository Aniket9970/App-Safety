import React, { useState, useEffect } from 'react';
import { Search,  Globe, Plus, Star, Flag, X } from 'lucide-react';
import { analyzeURL } from '../utils/urlAnalyzer';
import { AppDetails, Review, AnalysisResult } from '../types';
import { appStorageService } from '../services/appStorageService';

export default function AppChecker() {
  const [apps, setApps] = useState<AppDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<AppDetails | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newApp, setNewApp] = useState({
    name: '',
    url: '',
    category: 'Gaming',
    description: '',
    developer: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedAppForReview, setSelectedAppForReview] = useState<AppDetails | null>(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: ''
  });

  useEffect(() => {
    appStorageService.initializeStorage();
    setApps(appStorageService.getAllApps());
  }, []);

  const handleUrlCheck = async () => {
    if (!searchTerm.startsWith('http')) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const result = await analyzeURL(searchTerm);
      setAnalysis(result);
      setApps(appStorageService.getAllApps()); // Refresh the apps list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const analysis = await analyzeURL(newApp.url);
      setAnalysis(analysis);
      
      appStorageService.addApp({
        ...newApp,
        riskScore: analysis.riskScore,
        verificationStatus: analysis.authenticity.status,
        category: analysis.riskScore > 6 ? 'Gambling' : 
                 analysis.riskScore > 4 ? 'Fantasy Sports' : 'Gaming'
      });
      
      setApps(appStorageService.getAllApps());
      setShowAddForm(false);
      setNewApp({
        name: '',
        url: '',
        category: 'Gaming',
        description: '',
        developer: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add app');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReview = (appId: string) => {
    if (!newReview.comment || !newReview.userName) {
      setError('Please fill in all fields');
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      app_id: appId,
      user_id: 'user-' + Math.random().toString(36).substr(2, 9),
      rating: newReview.rating,
      comment: newReview.comment,
      userName: newReview.userName,
      created_at: new Date().toISOString()
    };

    const updatedApps = apps.map(app => {
      if (app.id === appId) {
        const reviews = [...(app.reviews || []), review];
        const averageRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;
        return {
          ...app,
          reviews,
          averageRating
        };
      }
      return app;
    });

    setApps(updatedApps);
    appStorageService.updateApps(updatedApps);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '', userName: '' });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderAppDetails = (app: AppDetails) => (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{app.name}</h3>
          <p className="text-gray-600">{app.developer}</p>
        </div>
        <div className="flex items-center gap-2">
          {app.averageRating && (
            <div className="flex items-center gap-1">
              {renderStars(Math.round(app.averageRating))}
              <span className="text-sm text-gray-600">
                ({app.reviews?.length || 0} reviews)
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            setSelectedAppForReview(app);
            setShowReviewForm(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Star className="h-4 w-4" />
          Write Review
        </button>
      </div>

      {app.reviews && app.reviews.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-4">Reviews</h4>
          <div className="space-y-4">
            {app.reviews.map(review => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{review.userName}</p>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderReviewForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Write a Review</h2>
          <button onClick={() => setShowReviewForm(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      rating <= newReview.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              value={newReview.userName}
              onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowReviewForm(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => selectedAppForReview?.id && handleAddReview(selectedAppForReview.id)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">App Safety Checker</h1>
      
      {/* Search and Analysis Section */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Enter app URL or search existing apps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleUrlCheck}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          disabled={isLoading}
        >
          <Globe className="h-5 w-5" />
          {isLoading ? 'Analyzing...' : 'Check URL'}
        </button>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus className="h-5 w-5" />
          Add New App
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps
          .filter(app => 
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.url.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(app => (
            <div
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{app.name}</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  app.category === 'Gambling' ? 'bg-red-100 text-red-800' :
                  app.category === 'Gaming' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {app.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{app.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>{app.averageRating?.toFixed(1) || 'No reviews'}</span>
                </div>
                <div className="flex items-center gap-2 text-red-500">
                  <Flag className="h-5 w-5" />
                  <span>{app.totalReports} reports</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Analysis Results Modal */}
      {analysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">Analysis Results</h2>
              <button
                onClick={() => setAnalysis(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Risk Score:</span>
                <span className={`px-2 py-1 rounded ${
                  analysis.riskScore < 5 ? 'bg-green-100 text-green-800' :
                  analysis.riskScore > 7 ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {analysis.riskScore.toFixed(1)}
                </span>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Warnings:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.warnings.map((warning, index) => (
                    <li key={index} className="text-gray-700">{warning}</li>
                  ))}
                </ul>
              </div>

              {analysis.termsAnalysis && (
                <div>
                  <h3 className="font-semibold mb-2">Terms Analysis:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className={analysis.termsAnalysis.hasWithdrawalRestrictions ? 'text-red-500' : 'text-green-500'}>
                        {analysis.termsAnalysis.hasWithdrawalRestrictions ? '⚠️' : '✓'}
                      </span>
                      Withdrawal Restrictions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={analysis.termsAnalysis.hasHiddenFees ? 'text-red-500' : 'text-green-500'}>
                        {analysis.termsAnalysis.hasHiddenFees ? '⚠️' : '✓'}
                      </span>
                      Hidden Fees
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={analysis.termsAnalysis.hasClearTerms ? 'text-green-500' : 'text-red-500'}>
                        {analysis.termsAnalysis.hasClearTerms ? '✓' : '⚠️'}
                      </span>
                      Clear Terms & Conditions
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add New App Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New App</h2>
              <button onClick={() => setShowAddForm(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddApp}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">App Name</label>
                  <input
                    type="text"
                    value={newApp.name}
                    onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <input
                    type="url"
                    value={newApp.url}
                    onChange={(e) => setNewApp({ ...newApp, url: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={newApp.category}
                    onChange={(e) => setNewApp({ ...newApp, category: e.target.value as any })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="Gaming">Gaming</option>
                    <option value="Gambling">Gambling</option>
                    <option value="Fantasy Sports">Fantasy Sports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Developer</label>
                  <input
                    type="text"
                    value={newApp.developer}
                    onChange={(e) => setNewApp({ ...newApp, developer: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newApp.description}
                    onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 text-red-600">{error}</p>
              )}

              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isLoading ? 'Adding...' : 'Add App'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add this where you want to show app details */}
      {selectedApp && renderAppDetails(selectedApp)}
      
      {/* Add the review form modal */}
      {showReviewForm && renderReviewForm()}
    </div>
  );
}