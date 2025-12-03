import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useUserStore } from "@/Store/user.store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUpdateForm } from "@/hooks/User/user.hook";
import { Camera, Mail, BookOpen, User as UserIcon } from "lucide-react";

const Profile = () => {
    const { user } = useUserStore();
    const { register, handleSubmit, reset } = useForm();
    const [preview, setPreview] = useState(null);
    const [open, setOpen] = useState(false); // Dialog state control

    const { mutate, isPending } = useUpdateForm();

    const updateFormHandler = async (data) => {
        const formData = new FormData();
        
        if (data.fullName) {
            formData.append('fullName', data.fullName);
        }
        
        if (data.profilePhoto && data.profilePhoto[0]) {
            formData.append('profilePhoto', data.profilePhoto[0]);
        }
        
        mutate(formData, {
            onSuccess: () => {
                setOpen(false); // Close dialog on success
                setPreview(null); // Reset preview
                reset(); // Reset form
            }
        });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Background */}
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    
                    {/* Profile Content */}
                    <div className="relative px-6 pb-6">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center -mt-16">
                            <div className="relative">
                                <img 
                                    className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover bg-gray-100"
                                    src={user?.profilePhoto || "https://via.placeholder.com/150"} 
                                    alt="Profile" 
                                />
                                <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-2 shadow-lg">
                                    <Camera className="h-4 w-4 text-white" />
                                </div>
                            </div>
                            
                            {/* User Info */}
                            <div className="mt-4 text-center">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {user?.fullName || "User Name"}
                                </h1>
                                <p className="text-gray-500 flex items-center justify-center gap-2 mt-2">
                                    <Mail className="h-4 w-4" />
                                    {user?.email || "user@example.com"}
                                </p>
                            </div>

                            {/* Edit Profile Button */}
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                                    Edit Profile
                                </DialogTrigger>
                                
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-gray-900">
                                            Update Profile
                                        </DialogTitle>
                                        <DialogDescription className="text-gray-600">
                                            Make changes to your profile information
                                        </DialogDescription>
                                    </DialogHeader>
                                    
                                    <form onSubmit={handleSubmit(updateFormHandler)} className="space-y-6 mt-4">
                                        {/* Full Name Input */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <UserIcon className="h-4 w-4" />
                                                Full Name
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder="Enter your name"
                                                defaultValue={user?.fullName}
                                                {...register("fullName")}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                            />
                                        </div>
                                        
                                        {/* Profile Photo Input */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Camera className="h-4 w-4" />
                                                Profile Photo
                                            </label>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                {...register("profilePhoto")}
                                                onChange={handleFileChange}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                            />
                                        </div>
                                        
                                        {/* Preview Image */}
                                        {preview && (
                                            <div className="flex justify-center">
                                                <div className="relative">
                                                    <img 
                                                        src={preview} 
                                                        alt="Preview" 
                                                        className="h-24 w-24 rounded-full object-cover border-4 border-blue-100 shadow-md" 
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-full transition-all duration-200 flex items-center justify-center">
                                                        <span className="text-white text-xs font-medium opacity-0 hover:opacity-100">Preview</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Submit Button */}
                                        <button 
                                            type="submit"
                                            disabled={isPending}
                                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            {isPending ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        ircle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Updating...
                                                </span>
                                            ) : "Update Profile"}
                                        </button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Stats Section */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Purchased Courses */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-200 shadow-md">
                                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                <p className="text-3xl font-bold text-blue-600">
                                    {user?.purchasedCourses?.length || 0}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">Courses Enrolled</p>
                            </div>

                            {/* Additional Stats - You can customize */}
                           

                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
