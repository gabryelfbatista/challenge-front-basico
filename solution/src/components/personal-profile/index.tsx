'use client';
import Image from 'next/image';
import profilePic from '../../../public/profile_picture.jpeg';
import backgroundPic from '../../../public/background_profile.jpg';
import * as personalData from '../../database/personal-profile.json';
import { useEffect, useState } from 'react';
import { getRandomUser } from '@/app/actions';
import { parseCookies, setCookie } from 'nookies';

type MinimalUser = {
    name: {
        first: string;
        last: string;
    } ;
    location: {
        city: string;
        country: string;  
    },
    picture: {
        large: string;
        medium: string;
        thumbnai: string;
    };
};

export default function ProfileCard() {
    const [userData, setUserData] = useState<any>(personalData);
    const [usePersonalImages, setUsePersonalImages] = useState(true);
    const [usersList, setUsersList] = useState<MinimalUser[]>([]);

    // Carregar os cookies ao montar o componente
    useEffect(() => {
        const cookies = parseCookies();
        const storedUsersList = cookies.usersList ? JSON.parse(cookies.usersList) : [];
        
        if (Array.isArray(storedUsersList)) {
            setUsersList(storedUsersList);
            console.log('Loaded users from cookies:', storedUsersList);
        }
    }, []);

    // Função para adicionar um novo usuário
    async function handleClick() {
        const response = await getRandomUser();
        const newUser = response.results[0];

        // Criar estrutura mínima para o novo usuário
        const minimalUser: MinimalUser = {
            name: {
                first: `${newUser.name.first}`,
                last: `${newUser.name.last}`
            },
            location: {
                city: newUser.location.city,
                country: newUser.location.country,
            },            
            picture: {
                large: newUser.picture.large,
                medium: newUser.picture.medium,
                thumbnai: newUser.picture.thumbnail
            }
        };

        // Atualizar a lista de usuários
        const updatedUsersList = [...usersList, minimalUser];
        setUsersList(updatedUsersList);

        // Atualizar o usuário atual
        setUserData(minimalUser);
        setUsePersonalImages(false);

        // Salvar nos cookies
        setCookie(null, 'usersList', JSON.stringify(updatedUsersList), {
            path: '/',
            maxAge: 1 * 60 * 60, // Expira em 1 hora
        });

        console.log('Updated users list:', updatedUsersList);
    }

    return (
        <div className="max-h-full mt-10 w-full shadow rounded">
            <div className="grid grid-cols-3 w-full">
                <div></div>
                <div className="font-bold place-self-center self-center">Find someone like you</div>
                <button
                    className="place-self-end self-center bg-blue-500 text-white py-2 px-4 rounded-md"
                    onClick={handleClick}
                >
                    Next one
                </button>
            </div>
            <div className="h-14 sm:h-28 md:h-48 lg:h-80">
                <Image
                    src={backgroundPic}
                    alt={'background picture'}
                    className="object-cover object-top w-full"
                    layout="responsive"
                    width={100}
                    height={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                />
            </div>
            <div className="relative mx-auto h-20 w-20 sm:h-32 sm:w-32 md:h-40 md:w-40">
                <Image
                    src={usePersonalImages ? profilePic : userData.picture.medium}
                    alt={'profile picture'}
                    fill
                    className="rounded-full object-cover object-center border-4 border-white shadow"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                />
            </div>
            <div className="flex flex-col justify-items-center my-5">
                <button className="bg-blue-500 text-white mx-auto py-2 px-4 rounded-md">
                    Follow
                </button>
                <div className="mx-auto my-5">{userData?.name?.first} {userData?.name?.last}</div>
                <div className="mx-auto mb-5">
                    {userData?.location?.city}, {userData?.location?.country}
                </div>
            </div>
        </div>
    );
}
