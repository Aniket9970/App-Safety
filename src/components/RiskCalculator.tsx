import React, { useState } from 'react';
import { AlertTriangle, Globe, FileText } from 'lucide-react';
import { analyzeURL } from '../utils/urlAnalyzer';

export default function RiskCalculator() {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<'url' | 'text'>('url');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError('');
    setAnalysis(null);

    try {
      if (inputType === 'url') {
        // Basic URL validation
        new URL(input);
        const result = await analyzeURL(input);
        setAnalysis(result);
      } else {
        // Text analysis
        const warnings = [];
        let riskScore = 0;

        // Analyze terms & conditions text
        const lowerText = input.toLowerCase();
        
        if (lowerText.includes('no refund') || lowerText.includes('non-refundable')) {
          warnings.push('No refund policy detected');
          riskScore += 3;
        }
        
        if (lowerText.includes('withdrawal restriction') || lowerText.includes('withdrawal limit')) {
          warnings.push('Withdrawal restrictions detected');
          riskScore += 4;
        }
        
        if (lowerText.includes('bonus') && (lowerText.includes('condition') || lowerText.includes('term'))) {
          warnings.push('Bonus terms may have hidden conditions');
          riskScore += 2;
        }
        
        if (lowerText.includes('liability') && lowerText.includes('not responsible')) {
          warnings.push('Broad liability disclaimers detected');
          riskScore += 2;
        }

        setAnalysis({
          riskScore: Math.min(riskScore, 10),
          warnings,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Risk Calculator</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setInputType('url')}
              className={`px-4 py-2 rounded-lg ${
                inputType === 'url'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Analyze URL
            </button>
            <button
              onClick={() => setInputType('text')}
              className={`px-4 py-2 rounded-lg ${
                inputType === 'text'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Analyze Text
            </button>
          </div>

          {inputType === 'url' ? (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter app or website URL..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          ) : (
            <textarea
              rows={8}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste terms & conditions or app description here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          )}
        </div>
        
        <button
          onClick={handleAnalyze}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          disabled={isLoading || !input}
        >
          {inputType === 'url' ? (
            <Globe className="h-5 w-5" />
          ) : (
            <FileText className="h-5 w-5" />
          )}
          Analyze Risk
        </button>

        {error && (
          <p className="mt-2 text-red-600">{error}</p>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing...</p>
        </div>
      ) : analysis && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-6">
            <AlertTriangle className={`h-8 w-8 ${
              analysis.riskScore >= 7 ? 'text-red-500' :
              analysis.riskScore >= 4 ? 'text-yellow-500' :
              'text-green-500'
            }`} />
            <div>
              <h2 className="text-xl font-semibold">Risk Score: {analysis.riskScore}/10</h2>
              <p className="text-gray-600">
                {analysis.riskScore >= 7 ? 'High Risk' :
                 analysis.riskScore >= 4 ? 'Medium Risk' :
                 'Low Risk'}
              </p>
            </div>
          </div>

          {analysis.warnings && analysis.warnings.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Risks Identified:</h3>
              <ul className="list-disc list-inside space-y-2">
                {analysis.warnings.map((warning: string, index: number) => (
                  <li key={index} className="text-gray-700">{warning}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.termsAnalysis && (
            <div className="mt-6">
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
      )}
    </div>
  );
}