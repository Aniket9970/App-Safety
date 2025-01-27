import React from 'react';
import { BookOpen, Shield, AlertTriangle, Scale } from 'lucide-react';

export default function GamingGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Responsible Gaming Guide</h1>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="h-8 w-8 text-indigo-600" />
            <h2 className="text-2xl font-semibold">Safe Gaming Practices</h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li>• Set strict time limits for gaming sessions</li>
            <li>• Never chase losses or spend more than you can afford</li>
            <li>• Keep gaming entertainment, not a source of income</li>
            <li>• Use only verified and legally compliant gaming apps</li>
            <li>• Enable responsible gaming features when available</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <h2 className="text-2xl font-semibold">Warning Signs</h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li>• Spending more time or money than intended</li>
            <li>• Gaming affecting work or relationships</li>
            <li>• Feeling anxious or irritable when not gaming</li>
            <li>• Hiding gaming activities from others</li>
            <li>• Borrowing money for gaming</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <Scale className="h-8 w-8 text-green-500" />
            <h2 className="text-2xl font-semibold">Legal Framework</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p>
              In India, gaming apps are regulated based on whether they're games of skill
              or chance. Games of skill are generally legal, while games of chance may
              be restricted or prohibited depending on the state.
            </p>
            <p>
              Key aspects to verify:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Proper registration and licensing</li>
              <li>Transparent terms and conditions</li>
              <li>Clear withdrawal policies</li>
              <li>Responsible gaming features</li>
              <li>Data protection measures</li>
            </ul>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h2 className="text-2xl font-semibold">Resources</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">
              If you or someone you know needs help with gaming-related issues,
              contact these organizations:
            </p>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  National Helpline for Gaming Addiction
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  Responsible Gaming Council
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  Gaming Laws Resource Center
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}