import React from 'react';
import { ArrowRight, Users, Rocket, MessageSquare, Search, Book } from 'lucide-react';
import { Link } from "react-router-dom";

const Home = () => {
return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <h1 className="text-2xl font-bold text-blue-600">CollabNest</h1>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <a href="#features" className="text-gray-600 hover:text-blue-600 px-3 py-2">Features</a>
                            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 px-3 py-2">How it Works</a>
                            <a href="#about" className="text-gray-600 hover:text-blue-600 px-3 py-2">About</a>
                            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Sign Up
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-grow flex items-center justify-center bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
                        <div className="text-center">
                            <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block">Collaborate on Projects</span>
                                <span className="block text-blue-600">Find Your Perfect Team</span>
                            </h2>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                                Connect with fellow students, share ideas, and build amazing projects together. 
                                ColabNest makes student collaboration easier than ever.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                                <div className="rounded-md shadow">
                                <Link to="/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                                        Get Started
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Features that Empower Collaboration</h2>
                </div>

                <div className="mt-10">
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow">
                            <Users className="h-12 w-12 text-blue-600" />
                            <h3 className="mt-4 text-xl font-medium text-gray-900">Team Formation</h3>
                            <p className="mt-2 text-center text-gray-500">
                                Find teammates based on skills, interests, and project goals.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow">
                            <MessageSquare className="h-12 w-12 text-blue-600" />
                            <h3 className="mt-4 text-xl font-medium text-gray-900">Real-time Chat</h3>
                            <p className="mt-2 text-center text-gray-500">
                                Communicate seamlessly with your team members in real-time.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow">
                            <Search className="h-12 w-12 text-blue-600" />
                            <h3 className="mt-4 text-xl font-medium text-gray-900">Project Discovery</h3>
                            <p className="mt-2 text-center text-gray-500">
                                Browse and join ongoing projects or start your own.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="how-it-works" className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">How ColabNest Works</h2>
                    <p className="mt-4 text-lg text-gray-500">Follow these simple steps to get started</p>
                </div>

                <div className="mt-10">
                    <div className="flex flex-col space-y-10 md:flex-row md:space-y-0 md:space-x-8">
                        <div className="flex-1 text-center">
                            <div className="flex justify-center">
                                <Book className="h-12 w-12 text-blue-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium">1. Create Your Profile</h3>
                            <p className="mt-2 text-gray-500">Add your skills, interests, and academic background</p>
                        </div>

                        <div className="flex-1 text-center">
                            <div className="flex justify-center">
                                <Search className="h-12 w-12 text-blue-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium">2. Find Projects</h3>
                            <p className="mt-2 text-gray-500">Browse available projects or create your own</p>
                        </div>

                        <div className="flex-1 text-center">
                            <div className="flex justify-center">
                                <Rocket className="h-12 w-12 text-blue-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium">3. Start Collaborating</h3>
                            <p className="mt-2 text-gray-500">Connect with your team and begin working together</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-blue-600">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-white">Ready to Start Collaborating?</h2>
                    <p className="mt-4 text-xl text-blue-100">Join ColabNest today and connect with fellow students!</p>
                    <div className="mt-8">
                        <Link to="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100">
                                    Sign Up Now
                                </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white font-bold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Guides</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white">Privacy</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Terms</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Security</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center">
                    <p className="text-gray-400">&copy; 2025 ColabNest. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
);
};

export default Home;