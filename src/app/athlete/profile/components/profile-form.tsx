"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { updateUserProfile } from "@/lib/redux/slices/authSlice"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase/client"

const profileFormSchema = z.object({
    first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
    last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    date_of_birth: z
      .date() // Strictly expect a Date object
      .refine((val) => !isNaN(val.getTime()), { message: "Invalid date" }),
    gender: z.string({ required_error: "Please select a gender." }),
    sport: z.string({ required_error: "Please select a primary sport." }),
    position: z.string().optional(),
    height: z.union([
      z.string().min(1).nullable(), // Explicit string or null
      z.literal("") // Handle empty string case
    ]).transform(val => val === "" ? null : val),
    weight: z.union([
      z.string().min(1).nullable(), // Explicit string or null
      z.literal("")
    ]).transform(val => val === "" ? null : val),
    avatar_url: z.string().optional().nullable(),
    location: z.string().min(2, { message: "Location must be at least 2 characters." }),
    bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }).optional()
  })

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const dispatch = useAppDispatch()
  const { user, userDetails } = useAppSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(userDetails?.avatar_url || undefined)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const defaultValues: Partial<ProfileFormValues> = {
    first_name: userDetails?.first_name || "",
    last_name: userDetails?.last_name || "",
    date_of_birth: userDetails?.date_of_birth ? new Date(userDetails.date_of_birth) : undefined,
    gender: userDetails?.gender || "",
    sport: userDetails?.sport || "",
    position: userDetails?.position || "",
    height: userDetails?.height ? String(userDetails.height) : null,
    weight: userDetails?.weight ? String(userDetails.weight) : null,
    avatar_url: userDetails?.avatar_url || null,
    location: userDetails?.location || "",
    bio: userDetails?.bio || "",
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      setAvatarUrl(URL.createObjectURL(file))
    } else {
      setAvatarFile(null)
      setAvatarUrl(undefined)
    }
  }

  const handleAvatarUpload = async (file: File): Promise<string | null> => {
    if (!user) {
      console.error("No user found for avatar upload");
      return null;
    }
  
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
  
      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
  
      if (uploadError) {
        throw uploadError;
      }
  
      // Get public URL of the uploaded file
      const { data: { publicUrl } } = await supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
  
      return publicUrl;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      return null;
    }
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!user) return

    setIsLoading(true)

    try {
      let avatar_url = userDetails?.avatar_url || null

      // Upload new avatar if changed
      if (avatarFile) {
        const newAvatarUrl = await handleAvatarUpload(avatarFile)
        if (newAvatarUrl) {
          avatar_url = newAvatarUrl
        }
      }

      await dispatch(
        updateUserProfile({
          userId: user.id,
          profileData: {
            ...data,
            date_of_birth: data.date_of_birth ? format(data.date_of_birth, "yyyy-MM-dd") : undefined,
            height: data.height || undefined,
            weight: data.weight || undefined,
            avatar_url: avatar_url || "",
          },
        })
      )
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details and profile information.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<ProfileFormValues>)}>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="relative">
            <Avatar className="h-24 w-24">
            {avatarUrl ? (
                <AvatarImage src={avatarUrl} />
            ) : (
                <AvatarFallback>
                {userDetails?.first_name?.[0]}
                {userDetails?.last_name?.[0]}
                </AvatarFallback>
            )}
            </Avatar>
              <Label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                +
              </Label>
              <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">Upload a photo for your profile. JPG or PNG. Max 2MB.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" {...form.register("first_name")} placeholder="Enter your first name" />
              {form.formState.errors.first_name && (
                <p className="text-sm text-destructive">{form.formState.errors.first_name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" {...form.register("last_name")} placeholder="Enter your last name" />
              {form.formState.errors.last_name && (
                <p className="text-sm text-destructive">{form.formState.errors.last_name.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("date_of_birth") && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("date_of_birth") ? (
                      format(form.watch("date_of_birth"), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.watch("date_of_birth")}
                    onSelect={(date) => {
                      if (date) {
                        form.setValue("date_of_birth", date, { shouldValidate: true });
                      }
                    }}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.date_of_birth && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.date_of_birth.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => form.setValue("gender", value)} defaultValue={form.getValues("gender")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.gender && (
                <p className="text-sm text-destructive">{form.formState.errors.gender.message}</p>
              )}
            </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sport">Primary Sport</Label>
              <Select onValueChange={(value) => form.setValue("sport", value)} defaultValue={form.getValues("sport")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soccer">Soccer</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="athletics">Athletics</SelectItem>
                  <SelectItem value="volleyball">Volleyball</SelectItem>
                  <SelectItem value="swimming">Swimming</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="rugby">Rugby</SelectItem>
                  <SelectItem value="cricket">Cricket</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.sport && (
                <p className="text-sm text-destructive">{form.formState.errors.sport.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position/Specialty</Label>
              <Input id="position" {...form.register("position")} placeholder="E.g., Forward, Sprinter, etc." />
            </div>
          </div>

        <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input 
                id="height" 
                type="number" 
                {...form.register("height")}
                placeholder="Height in cm"
                value={form.watch("height") ?? ""}
                onChange={(e) => form.setValue("height", e.target.value === "" ? null : e.target.value)}
            />
            </div>
            <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input 
                id="weight" 
                type="number" 
                {...form.register("weight")}
                placeholder="Weight in kg"
                value={form.watch("weight") ?? ""}
                onChange={(e) => form.setValue("weight", e.target.value === "" ? null : e.target.value)}
            />
            </div>            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register("location")} placeholder="City, Country" />
              {form.formState.errors.location && (
                <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...form.register("bio")}
              placeholder="Tell us about yourself, your sports journey, and your goals..."
              className="min-h-[100px]"
            />
            {form.formState.errors.bio && (
              <p className="text-sm text-destructive">{form.formState.errors.bio.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

