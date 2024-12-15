"use client"
import Image from 'next/image'
import profilePic from '../../../public/profile_picture.jpeg'
import backgroundPic from '../../../public/background_profile.jpg'
import * as personalData from '../../database/personal-profile.json'


export default function ProfileCard({usersList}: any) {
    let userData = usersList[0]
    let usePersonalImages = false
    if (userData == null) {
        userData = personalData
        usePersonalImages = true
    }
    return (
    <div className="max-h-full mt-10 w-full shadow rounded"> 
        <div className="h-14 sm:h-28 md:h-48 lg:h-80">

            <Image 
                src={ backgroundPic}
                alt={'background picture'}
                className="object-cover object-top w-full"
                layout="responsive"
                width={100}
                height={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw" 
            >
            </Image>

        </div>
        <div className='relative mx-auto h-20 w-20 sm:h-32 sm:w-32 md:h-40 md:w-40 '>
            <Image
                src={usePersonalImages? profilePic : userData.picture.large}
                alt={'profile picture'}
                fill
                className="rounded-full object-cover object-center border-4 border-white shadow"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                >
            </Image>  
        </div>
        <div className='flex flex-col justify-items-center my-5'>
            <button className="bg-blue-500 text-white mx-auto py-2 px-4 rounded-md">
                Follow
            </button>
            <div className='mx-auto my-5'>{userData.name.first} {userData.name.last}</div>
            <div className='mx-auto mb-5'>{userData.location.city}, {userData.location.country}</div>
        </div>

            
    </div>
    )
}