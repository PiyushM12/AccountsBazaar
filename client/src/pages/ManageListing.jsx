import { useAuth } from "@clerk/react";
import { Loader2Icon, Upload, ArrowLeftIcon, Sparkles, X, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../configs/axios";
import { getAllPublicListing, getAllUserListing } from "../app/features/listingSlice";
import ListingCard from "../components/ListingCard";

const ManageListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userListings } = useSelector((state) => state.listing);

  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [loadingListing, setLoadingListing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    platform: "youtube",
    username: "",
    followers_count: "",
    engagement_rate: "",
    monthly_views: "",
    niche: "tech",
    price: "",
    description: "",
    verified: false,
    monetized: false,
    country: "",
    age_range: "18-24 years",
    images: [],
  });

  const platforms = [
    "youtube",
    "instagram",
    "tiktok",
    "facebook",
    "twitter",
    "linkedin",
    "pinterest",
    "snapchat",
    "twitch",
    "discord",
  ];

  const niches = [
    "lifestyle",
    "fitness",
    "food",
    "travel",
    "tech",
    "gaming",
    "fashion",
    "beauty",
    "business",
    "education",
    "entertainment",
    "music",
    "art",
    "sports",
    "health",
    "finance",
    "other",
  ];

  const ageRanges = [
    "13-17 years",
    "18-24 years",
    "25-34 years",
    "35-44 years",
    "45-54 years",
    "55+ years",
    "Mixed ages",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    if (files.length + formData.images.length > 5)
      return toast.error("You can add up to 5 proof images");
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove),
    }));
  };

  useEffect(() => {
    if (!id) return;
    setIsEditing(true);
    setLoadingListing(true);
    const listing = userListings.find((listing) => listing.id === id || listing._id === id);
    if (listing) {
      setFormData(listing);
      setLoadingListing(false);
    } else {
      toast.error("Listing not found");
      navigate("/my-listings");
    }
  }, [id, userListings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading('Saving Account Details...');
    const dataCopy = structuredClone(formData);
    try {
      if (isEditing) {
        dataCopy.images = formData.images.filter((image) => typeof image === "string");

        const formDataInstance = new FormData();
        formDataInstance.append('accountDetails', JSON.stringify(dataCopy));

        formData.images.filter((image) => typeof image !== 'string').forEach(
          (image) => { formDataInstance.append('images', image); }
        );

        const token = await getToken();

        const { data } = await api.put('/api/listing', formDataInstance, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.dismissAll();
        toast.success(data.message);
        dispatch(getAllUserListing({ getToken }));
        dispatch(getAllPublicListing());
        navigate('/my-listings');
      } else {
        delete dataCopy.images;
        const formDataInstance = new FormData();
        formDataInstance.append('accountDetails', JSON.stringify(dataCopy));
        formData.images.forEach((image) => {
          formDataInstance.append('images', image);
        });
        const token = await getToken();
        const { data } = await api.post('/api/listing', formDataInstance, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.dismissAll();
        toast.success(data.message);
        dispatch(getAllUserListing({ getToken }));
        dispatch(getAllPublicListing());
        navigate('/my-listings');
      }
    } catch (error) {
      toast.dismissAll();
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  if (loadingListing) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2Icon className="size-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  // Construct mock listing object for real-time preview
  const previewListing = {
    id: 'preview_1',
    title: formData.title || 'Your Channel Title',
    platform: formData.platform || 'youtube',
    username: formData.username ? (formData.username.startsWith('@') ? formData.username.slice(1) : formData.username) : 'handle',
    followers_count: Number(formData.followers_count) || 12000,
    engagement_rate: Number(formData.engagement_rate) || 4.2,
    price: Number(formData.price) || 1500,
    niche: formData.niche || 'tech',
    country: formData.country || 'USA',
    description: formData.description || 'Provide details about your account reach and engagement here.',
    verified: Boolean(formData.verified),
    monetized: Boolean(formData.monetized),
    featured: true
  };

  return (
    <div className="py-8 px-4 sm:px-8 md:px-16 lg:px-24 max-w-7xl mx-auto min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="mb-8 border-b border-white/10 pb-6 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 mb-2 transition"
          >
            <ArrowLeftIcon className="size-3.5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>{isEditing ? "Edit Account Listing" : "List Your Account for Sale"}</span>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
              Step 1 of 1
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {isEditing
              ? "Update your channel metadata, pricing, and proof screenshots."
              : "Fill in account details below to generate a verified marketplace listing."}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8">
        
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex-1 w-full space-y-6">
          
          {/* Basic Information */}
          <Section title="1. Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Listing Title *"
                value={formData.title}
                placeholder="e.g. 100k Tech & Gaming YouTube Channel"
                onChange={(v) => handleInputChange("title", v)}
                required={true}
              />

              <SelectField
                label="Platform *"
                options={platforms}
                value={formData.platform}
                onChange={(v) => handleInputChange("platform", v)}
                required={true}
              />

              <InputField
                label="Username / Handle *"
                value={formData.username}
                placeholder="@username"
                onChange={(v) => handleInputChange("username", v)}
                required={true}
              />

              <SelectField
                label="Niche / Category *"
                options={niches}
                value={formData.niche}
                onChange={(v) => handleInputChange("niche", v)}
                required={true}
              />
            </div>
          </Section>

          {/* Account Metrics */}
          <Section title="2. Performance & Reach Metrics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <InputField
                label="Followers / Subscribers *"
                type="number"
                min={0}
                value={formData.followers_count}
                placeholder="e.g. 50000"
                onChange={(v) => handleInputChange("followers_count", v)}
                required={true}
              />

              <InputField
                label="Engagement Rate (%)"
                type="number"
                min={0}
                max={100}
                value={formData.engagement_rate}
                placeholder="e.g. 4.5"
                onChange={(v) => handleInputChange("engagement_rate", v)}
              />

              <InputField
                label="Monthly Views / Impressions"
                type="number"
                min={0}
                value={formData.monthly_views}
                placeholder="e.g. 250000"
                onChange={(v) => handleInputChange("monthly_views", v)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <InputField
                label="Primary Audience Country"
                value={formData.country}
                placeholder="e.g. United States"
                onChange={(v) => handleInputChange("country", v)}
              />

              <SelectField
                label="Primary Audience Age Range"
                options={ageRanges}
                value={formData.age_range}
                onChange={(v) => handleInputChange("age_range", v)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <CheckboxField
                label="Account is verified on platform"
                checked={formData.verified}
                onChange={(v) => handleInputChange("verified", v)}
              />
              <CheckboxField
                label="Account monetization is active"
                checked={formData.monetized}
                onChange={(v) => handleInputChange("monetized", v)}
              />
            </div>
          </Section>

          {/* Pricing & Description */}
          <Section title="3. Asking Price & Description">
            <div className="mb-5">
              <InputField
                label="Asking Price (USD) *"
                type="number"
                min={0}
                value={formData.price}
                placeholder="e.g. 2500"
                onChange={(v) => handleInputChange("price", v)}
                required={true}
              />
            </div>

            <TextareaField
              label="Listing Description *"
              value={formData.description}
              onChange={(v) => handleInputChange("description", v)}
              required={true}
            />
          </Section>

          {/* Screenshots Upload */}
          <Section title="4. Analytics & Proof Screenshots">
            <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-2xl p-6 text-center bg-slate-900/60 transition">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Upload className="size-10 text-indigo-400 mx-auto mb-3" />
              <label
                htmlFor="images"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer inline-block shadow-md transition"
              >
                Upload Proof Screenshots
              </label>
              <p className="text-xs text-slate-400 mt-2">
                Add up to 5 screenshots of channel dashboard, lifetime views, or monetization proof.
              </p>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={typeof img === "string" ? img : URL.createObjectURL(img)}
                      alt={`Proof ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-white/10 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 transition cursor-pointer"
            >
              {isEditing ? "Update Listing" : "Publish Listing"}
            </button>
          </div>
        </form>

        {/* Real-time Preview Sticky Card */}
        <div className="w-full lg:w-96 shrink-0 sticky top-24">
          <div className="glass-panel p-5 rounded-3xl border border-white/10">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Eye className="size-4" />
              <span>Live Card Preview</span>
            </div>
            <ListingCard listing={previewListing} />
          </div>
        </div>

      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-5">
    <h2 className="text-base font-bold text-white tracking-wide border-b border-white/10 pb-3">{title}</h2>
    {children}
  </div>
);

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min = null,
  max = null,
}) => (
  <div>
    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
      {label}
    </label>
    <input
      type={type}
      min={min}
      max={max}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs border border-slate-700/80 rounded-xl focus:outline-none focus:border-indigo-500 transition-all placeholder-slate-500"
      required={required}
    />
  </div>
);

const SelectField = ({ label, options, value, onChange, required = false }) => (
  <div>
    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 bg-slate-900 text-white text-xs border border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 transition-all capitalize"
      required={required}
    >
      <option value="">Select Option...</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="capitalize">
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const CheckboxField = ({ label, checked, onChange, required = false }) => (
  <label className="flex items-center gap-2.5 cursor-pointer p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
      required={required}
    />
    <span className="text-xs font-medium text-slate-200">{label}</span>
  </label>
);

const TextareaField = ({ label, value, onChange, required = false }) => (
  <div>
    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
      {label}
    </label>
    <textarea
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Detailed description of content niche, monthly revenue, audience demographics, inclusion of email address, etc."
      className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs border border-slate-700/80 rounded-xl focus:outline-none focus:border-indigo-500 transition-all placeholder-slate-500"
      required={required}
    />
  </div>
);

export default ManageListing;
