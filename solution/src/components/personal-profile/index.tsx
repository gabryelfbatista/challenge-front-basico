'use client'
import Image from 'next/image'
import profilePic from '../../../public/profile_picture.jpeg'
import backgroundPic from '../../../public/background_profile.jpg'
import * as personalData from '../../database/personal-profile.json'
import { useEffect, useState } from 'react'
import { getRandomUser } from '@/app/actions'
import { parseCookies, setCookie } from 'nookies'


export default function ProfileCard() {
    const cookies = parseCookies()
    console.log(cookies)

    let [userData, setUserData] = useState(personalData)
    let [usePersonalImages, setUsePersonalImages] = useState(true)
    const [usersList, setUsersList] = useState<any[]>([]);
   
    let data:any = null
    async function handleClick () {
        const response = await getRandomUser()
        data = response.results[0]
        const updatedUsersList = [...usersList, data];

        setUsersList(updatedUsersList);
        setUserData(data)
        setUsePersonalImages(false)

        console.log(updatedUsersList);

        // Salva a lista no cookie como JSON
        setCookie(null, 'usersList', JSON.stringify(updatedUsersList), {
            path: '/',
            maxAge: 30 * 24 * 60 * 60, // Expira em 30 dias
        });

    }
    useEffect(() => {
        // Recupera o cookie e inicializa o estado, mantendo os dados predefinidos se não houver cookie
        const storedUsersList = cookies.usersList ? JSON.parse(cookies.usersList) : [];
        setUsersList(storedUsersList);

        // // Se houver usuários salvos, inicializa com o último; caso contrário, usa os predefinidos
        // if (storedUsersList.length > 0) {
        //     setUserData(storedUsersList[storedUsersList.length - 1]);
        //     setUsePersonalImages(false);
        // }
    }, [])

    return (
    <div className="max-h-full mt-10 w-full shadow rounded"> 
        <div className='grid grid-cols-3 w-full'>
                <div></div>
                <div className='font-bold place-self-center self-center'>Find someone like you</div>
                <button 
                    className="place-self-end self-center bg-blue-500 text-white py-2 px-4 rounded-md"
                    onClick={() => handleClick()}
                >
                    Next one
                </button>
            </div>
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
            <div className='mx-auto my-5'>{userData?.name?.first} {userData?.name?.last}</div>
            <div className='mx-auto mb-5'>{userData?.location?.city}, {userData?.location?.country}</div>
        </div>

            
    </div>
    )
}