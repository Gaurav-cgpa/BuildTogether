import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

// This is a sample skills list - you can expand it or fetch from an API
const PREDEFINED_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "SQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "GraphQL",
  "REST API",
  "React Native",
  "Vue.js",
  "Angular",
].sort();


const TagInput = ({ value, onChange, placeholder }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current?.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterSuggestions = (searchText) => {
    if (!searchText) return [];
    const filtered = PREDEFINED_SKILLS.filter(
      (skill) =>
        skill.toLowerCase().includes(searchText.toLowerCase()) &&
        !value.includes(skill)
    );
    return filtered;
  };

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
    setSuggestions(filterSuggestions(newInput));
    setShowSuggestions(true);
    setSelectedSuggestionIndex(-1);
  };

  const addTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag]);
      setInput("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && selectedSuggestionIndex !== -1) {
      e.preventDefault();
      addTag(suggestions[selectedSuggestionIndex]);
    } else if (e.key === " " && input) {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-wrap gap-2 p-2 bg-white rounded-lg border border-neutral-200 min-h-[42px]">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-sm bg-blue-50 text-blue-800 scale-fade-in group hover-lift"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1.5 text-blue-600 hover:text-blue-800"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white rounded-lg border border-neutral-200 shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => addTag(suggestion)}
              onMouseEnter={() => setSelectedSuggestionIndex(index)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 transition-colors
                ${index === selectedSuggestionIndex ? "bg-neutral-50" : ""}`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;