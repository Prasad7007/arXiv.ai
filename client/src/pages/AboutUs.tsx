import React from 'react';

function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            Our mission is to empower researchers, students, and academics by providing 
            a streamlined platform for managing and exploring research papers. 
            With advanced search capabilities, trend analysis, and bookmarking features, 
            we aim to simplify the research workflow and enhance knowledge discovery.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Feature 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">🔎 Context-Aware Search</h3>
              <p className="text-gray-700">
                Our system uses a custom-trained Word2Vec model on the arXiv dataset, 
                offering intelligent and context-aware search results.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">📊 Trend Analysis</h3>
              <p className="text-gray-700">
                Visualize trends with cumulative graphs, showing the monthly growth of papers 
                in specific categories.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">⭐ Bookmark & History</h3>
              <p className="text-gray-700">
                Save and revisit your favorite papers with easy bookmarking and search history tracking.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">📰 Summarization & Insights</h3>
              <p className="text-gray-700">
                Generate concise summaries using Hugging Face text summarization models 
                for faster comprehension of lengthy papers.
              </p>
            </div>

          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
          <ul className="list-disc pl-5 text-lg leading-relaxed">
            <li>⚙️ <strong>Frontend:</strong> React.js, Tailwind CSS</li>
            <li>🛠️ <strong>Backend:</strong> Node.js, Express.js, FastAPI</li>
            <li>📊 <strong>Database:</strong> PostgreSQL with Prisma ORM</li>
            <li>🧠 <strong>AI Models:</strong> Word2Vec (trained on arXiv), Hugging Face Summarization</li>
            <li>☁️ <strong>Deployment:</strong> Dockerized with orchestration via Apache Airflow</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Meet the Creator</h2>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <div className="flex-shrink-0 mr-6">
              <img 
                src="https://via.placeholder.com/120" 
                alt="Creator"
                className="rounded-full w-32 h-32"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">Prasad Agalave</h3>
              <p className="text-gray-700">AI Engineer | Full-Stack Developer</p>
              <p className="text-gray-700 mt-2">
                Passionate about building intelligent systems that simplify information 
                retrieval and enhance productivity for researchers and data enthusiasts.
              </p>
            </div>
          </div>
        </section>

        <footer className="text-center text-gray-600 mt-10">
          © {new Date().getFullYear()} arXiv Research Paper Management System. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default AboutUs;
