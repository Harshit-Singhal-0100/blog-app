import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getEvn } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Textarea } from "@/components/ui/textarea"
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from 'react-dropzone'
import { setUser } from '@/redux/user/user.slice'


const Profile = () => {

    const [filePreview, setPreview] = useState()
    const [file, setFile] = useState()
    const user = useSelector((state) => state.user)

    const { data: userData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`,
        { method: 'get', credentials: 'include' },

    )



    const dispath = useDispatch()

    const formSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 character long.'),
        email: z.string().email(),
        bio: z.string().min(3, 'Bio must be at least 3 character long.'),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            bio: '',
            password: '',
        },
    })

    useEffect(() => {
        if (userData && userData.success) {
            form.reset({
                name: userData.user.name,
                email: userData.user.email,
                bio: userData.user.bio,
            })
        }
    }, [userData])



    async function onSubmit(values) {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('data', JSON.stringify(values))

            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`, {
                method: 'put',
                credentials: 'include',
                body: formData
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            dispath(setUser(data.user))
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    const handleFileSelection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setPreview(preview)
    }

    if (loading) return <Loading />
    return (
        <Card className="max-w-screen-md mx-auto shadow-lg rounded-xl border border-gray-200">
            <CardContent className="p-6">
                <div className="flex justify-center items-center mt-10">
                    <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Avatar className="w-28 h-28 relative group border-2 border-violet-200 hover:border-violet-400 transition-all duration-300">
                                    <AvatarImage src={filePreview ? filePreview : userData?.user?.avatar} className="object-cover" />
                                    <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black bg-opacity-30 border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer transition-opacity duration-200">
                                        <IoCameraOutline color="#7c3aed" size={32} />
                                    </div>
                                </Avatar>
                            </div>
                        )}
                    </Dropzone>
                </div>
                <div className="mt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-semibold">Name</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Enter your name" 
                                                    {...field} 
                                                    className="border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 rounded-md transition-all duration-200"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm mt-1" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Enter your email address" 
                                                    {...field} 
                                                    className="border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 rounded-md transition-all duration-200"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm mt-1" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-semibold">Bio</FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                    placeholder="Enter bio" 
                                                    {...field} 
                                                    className="border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 rounded-md resize-none h-24 transition-all duration-200"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm mt-1" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="password" 
                                                    placeholder="Enter your password" 
                                                    {...field} 
                                                    className="border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 rounded-md transition-all duration-200"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm mt-1" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md transition-all duration-200 shadow-md"
                            >
                                Save Changes
                            </Button>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}

export default Profile