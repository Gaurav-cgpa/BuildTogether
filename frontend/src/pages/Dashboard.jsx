import { useState } from "react";
import { Search, PlusCircle, Filter, LogOut, User, Mail, X } from "lucide-react";
import { motion } from "framer-motion";

const dummyProjects = [
  {
    id: 1,
    title: "AI Chatbot",
    creator: { name: "Alice Johnson", skills: ["Python", "NLP"], college: "MIT", experience: "3 years", projects: 5 },
    description: "An AI-powered chatbot for customer support.",
    techStack: ["React", "Node.js", "TensorFlow"],
  },
  {
    id: 2,
    title: "E-Commerce Website",
    creator: { name: "Bob Smith", skills: ["React", "MongoDB"], college: "Stanford", experience: "2 years", projects: 4 },
    description: "A modern e-commerce platform with real-time inventory management.",
    techStack: ["React", "Express", "MongoDB"],
  },
  {
    id: 3,
    title: "Mobile App",
    creator: { name: "Charlie Brown", skills: ["Flutter", "Firebase"], college: "Harvard", experience: "4 years", projects: 6 },
    description: "A cross-platform mobile app for social networking.",
    techStack: ["Flutter", "Firebase"],
  },
  {
    id: 4,
    title: "Data Analytics Platform",
    creator: { name: "Dana White", skills: ["Python", "Pandas"], college: "Berkeley", experience: "5 years", projects: 8 },
    description: "A robust data analytics and visualization platform.",
    techStack: ["React", "Node.js", "Python"],
  },
];

export default function Dashboard() {
  const [searchProjects, setSearchProjects] = useState("");
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);

  const toggleTechFilter = (tech) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const filteredProjects = dummyProjects.filter((project) =>
    (searchProjects === "" ||
      project.title.toLowerCase().includes(searchProjects.toLowerCase())) &&
    (selectedTechs.length === 0 ||
      selectedTechs.some((tech) => project.techStack.includes(tech)))
  );

  return (
    <div className="flex h-screen bg-blue-50 flex-col">
      {/* Sticky header that remains visible */}
      <header className="bg-white shadow-md p-4 text-center text-xl font-semibold text-blue-600 sticky top-0 z-10">
        Dashboard
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 flex flex-col">
          {/* Static search and filter section */}
          <div className="space-y-4">
            <SearchBar placeholder="Search Projects..." onSearch={setSearchProjects} />
            <TechStackFilter selectedTechs={selectedTechs} onToggle={toggleTechFilter} />
          </div>
          {/* Scrollable projects list */}
          <div className="mt-6 flex-1 overflow-y-auto pr-2">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="p-6 bg-white shadow-lg rounded-xl flex flex-col space-y-4 mb-4"
              >
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setSelectedCreator(project.creator)}
                >
                  <User size={24} className="text-gray-500" />
                  <span className="font-semibold">{project.creator.name}</span>
                </div>
                <h3
                  className="text-lg font-bold cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                <p className="text-xs text-gray-500">
                  Tech Stack: {project.techStack.join(", ")}
                </p>
                <div className="flex justify-end">
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600">
                    <Mail size={20} className="mr-2" />
                    Send Request
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Floating add project button */}
      <div className="fixed bottom-6 right-6 bg-blue-600 p-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-700">
        <PlusCircle size={32} className="text-white" />
      </div>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {selectedCreator && (
        <CreatorInfoModal
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
        />
      )}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md h-full flex flex-col p-4">
      <ul className="flex flex-col flex-1 space-y-4">
        <li className="p-2 hover:bg-blue-100 rounded cursor-pointer flex items-center">
          <User size={28} className="text-gray-500 mr-2" />
          <span className="text-lg font-semibold">Profile</span>
        </li>
        <li className="p-2 hover:bg-blue-100 rounded cursor-pointer">My Task</li>
        <li className="p-2 hover:bg-blue-100 rounded cursor-pointer">My Projects</li>
      </ul>
      {/* Static logout button */}
      <div className="pt-4">
        <button className="w-full p-2 bg-blue-600 text-white text-center rounded cursor-pointer flex items-center justify-center hover:bg-blue-700">
          <LogOut className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
}

function SearchBar({ placeholder, onSearch }) {
  return (
    <div className="flex items-center p-2 border rounded-lg bg-white shadow-sm">
      <Search size={20} className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 outline-none"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

function TechStackFilter({ selectedTechs, onToggle }) {
  const allTechStacks = ["React", "Vue", "Angular", "Node.js", "Django", "TensorFlow"];
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = allTechStacks.filter(
    (tech) =>
      tech.toLowerCase().includes(query.toLowerCase()) &&
      !selectedTechs.includes(tech)
  );

  const addTech = (tech) => {
    onToggle(tech);
    setQuery("");
    setShowOptions(false);
  };

  return (
    <div className="mt-4 relative">
      <div className="flex items-center border rounded-lg bg-white shadow-sm p-2">
        <Filter size={20} className="text-gray-400 mr-2" />
        <input
          type="text"
          value={query}
          placeholder="Filter by tech..."
          onFocus={() => setShowOptions(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowOptions(true);
          }}
          className="flex-1 outline-none"
        />
      </div>
      {showOptions && filteredOptions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
          {filteredOptions.map((tech) => (
            <div
              key={tech}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => addTech(tech)}
            >
              {tech}
            </div>
          ))}
        </div>
      )}
      {selectedTechs.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedTechs.map((tech) => (
            <div key={tech} className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full">
              <span>{tech}</span>
              <button onClick={() => onToggle(tech)} className="ml-2">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectDetailModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">{project.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="text-sm text-gray-600">{project.description}</p>
        <p className="text-xs text-gray-500 mt-2">
          Tech Stack: {project.techStack.join(", ")}
        </p>
      </div>
    </div>
  );
}

function CreatorInfoModal({ creator, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">{creator.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="text-sm text-gray-600">
          <strong>College:</strong> {creator.college}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Experience:</strong> {creator.experience}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Skills:</strong> {creator.skills.join(", ")}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Projects Completed:</strong> {creator.projects}
        </p>
      </div>
    </div>
  );
}
