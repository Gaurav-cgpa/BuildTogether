import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import TagInput from "./TagInput";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/user.store";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    about: "",
    skills: [],
    experience: "",
    education: "",
    linkedin: "",
    github: "",
  });
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
      setPreviewURL(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid image file.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
  });

  const { updateDetails } = userStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    setLoading(true);

    try {
      const form = new FormData();
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("about", formData.about);
      form.append("skills", JSON.stringify(formData.skills)); // convert skills array to JSON
      form.append("experience", formData.experience);
      form.append("education", formData.education);
      form.append("linkedin", formData.linkedin);
      form.append("github", formData.github);

      if (formData.profilePicture) {
        form.append("profilePicture", formData.profilePicture);
      }

      const res = await updateDetails(form);

      if (res?.success) {
        toast.success("Profile updated successfully");
        navigate("/dashboard"); // Navigate only after successful update
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: null,
    }));
    setPreviewURL(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 sm:p-8 float-up">
          <h1 className="text-2xl font-semibold text-neutral-800 mb-1">Profile</h1>
          <p className="text-neutral-500 mb-8">Complete your profile information</p>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Profile Picture
              </label>
              <div
                {...getRootProps()}
                className={`relative cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
                  isDragActive
                    ? "border-neutral-400 bg-neutral-50"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <input {...getInputProps()} />
                {previewURL ? (
                  <div className="relative inline-block">
                    <img
                      src={previewURL}
                      alt="Profile preview"
                      className="mx-auto h-32 w-32 rounded-full object-cover scale-fade-in"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 rounded-full bg-neutral-100 p-1 text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-neutral-400" />
                    <p className="text-sm text-neutral-500">
                      Drag & drop an image or click to select
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* First and Last Name */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm input-transition input-ring"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm input-transition input-ring"
                  required
                />
              </div>
            </div>
            {/* About */}
            <div className="space-y-2">
              <label htmlFor="about" className="block text-sm font-medium text-neutral-700">
                About
              </label>
              <textarea
                id="about"
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                rows={4}
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm input-transition input-ring"
                placeholder="Tell us about yourself..."
              />
            </div>
            {/* Skills */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Skills</label>
              <TagInput
                value={formData.skills}
                onChange={(skills) => setFormData({ ...formData, skills })}
                placeholder="Type a skill and press enter..."
              />
            </div>
            {/* Experience */}
            <div className="space-y-2">
              <label htmlFor="experience" className="block text-sm font-medium text-neutral-700">
                Experience
              </label>
              <textarea
                id="experience"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                rows={3}
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm input-transition input-ring"
                placeholder="Share your work experience..."
              />
            </div>
            {/* Education */}
            <div className="space-y-2">
              <label htmlFor="education" className="block text-sm font-medium text-neutral-700">
                Education
              </label>
              <textarea
                id="education"
                value={formData.education}
                onChange={(e) =>
                  setFormData({ ...formData, education: e.target.value })
                }
                rows={3}
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm input-transition input-ring"
                placeholder="List your educational background..."
              />
            </div>
            {/* Social Links */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="linkedin" className="block text-sm font-medium text-neutral-700">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm input-transition input-ring"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="github" className="block text-sm font-medium text-neutral-700">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  id="github"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm input-transition input-ring"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-400 disabled:opacity-70 disabled:cursor-not-allowed hover-lift"
              >
                {loading ? "Updating Profile..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
