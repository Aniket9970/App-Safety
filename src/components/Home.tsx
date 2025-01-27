import React from 'react';
import { Link } from 'react-router-dom';
import HomeBackground from './HomeBackground';
import Icon from './Icon';

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <HomeBackground />
      
      <div className="relative space-y-12 px-4 py-8">
        <section className="text-center pt-12">
          <h1 className="text-6xl font-bold text-indigo-900 mb-6 drop-shadow-sm">
            Your Trusted Gaming App Safety Guide
          </h1>
          <p className="text-2xl text-indigo-800 max-w-2xl mx-auto font-medium">
            Verify authenticity, calculate risks, and make informed decisions about gaming apps
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl p-6 rounded-xl border-2 border-indigo-200 hover:border-indigo-300 transition-colors">
            <Icon type="shield" color="#4F46E5" />
            <h2 className="text-xl font-bold mb-2 text-indigo-900">App Authenticity</h2>
            <p className="text-base text-indigo-800 mb-4">
              Check if gaming apps are verified, suspicious, or fraudulent
            </p>
            <Link
              to="/app-checker"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Check Now →
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-2xl p-6 rounded-xl border-2 border-indigo-200 hover:border-indigo-300 transition-colors">
            <Icon type="calculator" color="#F59E0B" />
            <h2 className="text-xl font-bold mb-2 text-indigo-900">Risk Assessment</h2>
            <p className="text-base text-indigo-800 mb-4">
              Calculate risk scores and analyze terms & conditions
            </p>
            <Link
              to="/risk-calculator"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Calculate Risk →
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-2xl p-6 rounded-xl border-2 border-indigo-200 hover:border-indigo-300 transition-colors">
            <Icon type="guide" color="#10B981" />
            <h2 className="text-xl font-bold mb-2 text-indigo-900">Gaming Guide</h2>
            <p className="text-base text-indigo-800 mb-4">
              Learn about responsible gaming and legal compliance
            </p>
            <Link
              to="/gaming-guide"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Learn More →
            </Link>
          </div>
        </div>

        <section className="bg-white shadow-2xl p-12 rounded-xl border-2 border-indigo-200 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-indigo-900">About AppSafety</h2>
          <div className="space-y-6">
            <p className="text-xl text-indigo-800 leading-relaxed">
              AppSafety is your trusted companion in the world of gaming applications. We combine advanced analysis techniques with comprehensive safety checks to ensure you can enjoy gaming without worrying about security risks.
            </p>
            <p className="text-xl text-indigo-800 leading-relaxed">
              Our platform provides real-time risk assessment, authenticity verification, and detailed analysis of gaming applications. Whether you're a casual gamer or a serious player, we help you make informed decisions about the apps you use.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center bg-indigo-50 rounded-lg p-6 border-2 border-indigo-100">
                <div className="text-5xl font-bold text-indigo-600 mb-2">500+</div>
                <div className="text-xl text-indigo-800 font-medium">Apps Analyzed</div>
              </div>
              <div className="text-center bg-indigo-50 rounded-lg p-6 border-2 border-indigo-100">
                <div className="text-5xl font-bold text-indigo-600 mb-2">98%</div>
                <div className="text-xl text-indigo-800 font-medium">Accuracy Rate</div>
              </div>
              <div className="text-center bg-indigo-50 rounded-lg p-6 border-2 border-indigo-100">
                <div className="text-5xl font-bold text-indigo-600 mb-2">24/7</div>
                <div className="text-xl text-indigo-800 font-medium">Monitoring</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}