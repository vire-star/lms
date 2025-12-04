import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useUserStore } from "@/Store/user.store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUpdateForm } from "@/hooks/User/user.hook";
import { Camera, Mail, BookOpen, User as UserIcon, Award, Clock, CheckCircle2 } from "lucide-react";

const Profile = () => {
    const { user } = useUserStore();
    const { register, handleSubmit, reset } = useForm();
    const [preview, setPreview] = useState(null);
    const [open, setOpen] = useState(false);

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
                setOpen(false);
                setPreview(null);
                reset();
            }
        });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    // Get user initials for avatar fallback
    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || 'UN';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Main Profile Card */}
                <Card className="overflow-hidden shadow-xl">
                    {/* Header with Gradient Background */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                        
                        {/* Edit Button on Header */}
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button 
                                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30"
                                    size="sm"
                                >
                                    <Camera className="h-4 w-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold">Update Profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile information and photo
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleSubmit(updateFormHandler)} className="space-y-5 mt-4">
                                    {/* Full Name Input */}
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName" className="flex items-center gap-2">
                                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                                            Full Name
                                        </Label>
                                        <Input
                                            id="fullName"
                                            type="text"
                                            placeholder="Enter your full name"
                                            defaultValue={user?.fullName}
                                            {...register("fullName")}
                                            className="h-11"
                                        />
                                    </div>

                                    {/* Profile Photo Input */}
                                    <div className="space-y-2">
                                        <Label htmlFor="profilePhoto" className="flex items-center gap-2">
                                            <Camera className="h-4 w-4 text-muted-foreground" />
                                            Profile Photo
                                        </Label>
                                        <Input
                                            id="profilePhoto"
                                            type="file"
                                            accept="image/*"
                                            {...register("profilePhoto")}
                                            onChange={handleFileChange}
                                            className="h-11 cursor-pointer"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Recommended: Square image, max 5MB
                                        </p>
                                    </div>

                                    {/* Image Preview */}
                                    {preview && (
                                        <div className="flex justify-center py-2">
                                            <div className="relative group">
                                                <Avatar className="h-24 w-24 border-4 border-blue-100 shadow-lg">
                                                    <AvatarImage src={preview} className="object-cover" />
                                                </Avatar>
                                                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-xs font-medium">Preview</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setOpen(false);
                                                setPreview(null);
                                                reset();
                                            }}
                                            disabled={isPending}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isPending}>
                                            {isPending ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Updating...
                                                </>
                                            ) : "Save Changes"}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <CardContent className="relative px-6 pb-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-20">
                            <Avatar className="h-40 w-40 border-4 border-white shadow-2xl ring-4 ring-blue-50">
                                <AvatarImage 
                                    src={user?.profilePhoto} 
                                    alt={user?.fullName}
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                    {getInitials(user?.fullName)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 text-center sm:text-left sm:mb-4">
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                                    {user?.fullName || "User Name"}
                                </h1>
                                <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2 mb-3">
                                    <Mail className="h-4 w-4" />
                                    {user?.email || "user@example.com"}
                                </p>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Active Learner
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Enrolled Courses */}
                    <Card className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-blue-500">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    Enrolled Courses
                                </CardTitle>
                                <BookOpen className="h-5 w-5 text-blue-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">
                                {user?.purchasedCourses?.length || 0}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Active learning courses
                            </p>
                        </CardContent>
                    </Card>

                    {/* Completed Courses */}
                   

                    {/* Learning Hours */}
                    
                </div>

                
            </div>
        </div>
    )
}

export default Profile
