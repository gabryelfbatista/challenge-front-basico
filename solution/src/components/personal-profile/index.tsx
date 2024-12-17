'use client';
import Image from 'next/image';
import profilePic from '../../../public/profile_picture.jpeg';
import backgroundPic from '../../../public/background_profile.jpg';
import personalData from '../../database/personal-profile.json';
import { useEffect, useState } from 'react';
import { getRandomUser } from '@/app/actions';
import { parseCookies, setCookie } from 'nookies';

type MinimalUser = {
    login: {
        uuid: string;
    };
    name: {
        first: string;
        last: string;
    };
    location: {
        city: string;
        country: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
};

export default function ProfileCard() {
    const [userData, setUserData] = useState<any>(personalData);
    const [usePersonalImages, setUsePersonalImages] = useState(true);
    const [followedUsers, setFollowedUsers] = useState<MinimalUser[]>([]);
    const [suggestedUsers, setSuggestedUsers] = useState<MinimalUser[]>([]);  // Lista de sugeridos

    // Carregar os cookies ao montar o componente
    useEffect(() => {
        const cookies = parseCookies();
        const storedFollowedUsers = cookies.followedUsers ? JSON.parse(cookies.followedUsers) : [];
        const storedSuggestedUsers = cookies.suggestedUsers ? JSON.parse(cookies.suggestedUsers) : [];

        setFollowedUsers(storedFollowedUsers);

        // Excluir personalData da lista de sugeridos
        const filteredSuggestedUsers = storedSuggestedUsers.filter((user: MinimalUser) => user.login.uuid !== personalData.login.uuid);
        setSuggestedUsers(filteredSuggestedUsers);
    }, []);

    // Função para adicionar um novo usuário
    async function handleClick() {
        const response = await getRandomUser();
        const newUser = response.results[0];

        const minimalUser: MinimalUser = {
            login: { uuid: newUser.login.uuid },
            name: { first: newUser.name.first, last: newUser.name.last },
            location: { city: newUser.location.city, country: newUser.location.country },
            picture: {
                large: newUser.picture.large,
                medium: newUser.picture.medium,
                thumbnail: newUser.picture.thumbnail,
            },
        };

        setUserData(minimalUser);
        setUsePersonalImages(false);
    }

    // Função para seguir um usuário
    function handleFollow(user: MinimalUser) {
        if (user?.login?.uuid) {
            // Verifica se o usuário já foi seguido
            if (!followedUsers.some((followedUser) => followedUser.login.uuid === user.login.uuid)) {
                // Adicionar à lista de seguidos
                const updatedFollowedUsers = [...followedUsers, user];
                setFollowedUsers(updatedFollowedUsers);

                // Atualizar cookies de usuários seguidos
                setCookie(null, 'followedUsers', JSON.stringify(updatedFollowedUsers), {
                    path: '/',
                    maxAge: 1 * 60 * 60, // 1 hora
                });
            }

            // Remover da lista de sugeridos
            const updatedSuggestedUsers = suggestedUsers.filter((suggestedUser) => suggestedUser.login.uuid !== user.login.uuid);
            setSuggestedUsers(updatedSuggestedUsers);

            // Atualizar cookies de usuários sugeridos
            setCookie(null, 'suggestedUsers', JSON.stringify(updatedSuggestedUsers), {
                path: '/',
                maxAge: 1 * 60 * 60, // 1 hora
            });
        }
    }

    // Função para adicionar um usuário à lista de sugeridos
    const addToSuggestedUsers = (user: MinimalUser) => {
        if (user.login.uuid !== personalData.login.uuid) {
            setSuggestedUsers((prevSuggestedUsers) => {
                const updatedSuggestedUsers = [...prevSuggestedUsers, user];
                // Atualizar cookies de usuários sugeridos
                setCookie(null, 'suggestedUsers', JSON.stringify(updatedSuggestedUsers), {
                    path: '/',
                    maxAge: 1 * 60 * 60, // 1 hora
                });
                return updatedSuggestedUsers;
            });
        }
    };

    // Verificar se o usuário já foi seguido
    const isFollowed = followedUsers.some((user) => user.login?.uuid === userData.login?.uuid);

    // Verificar se é o próprio usuário do personalData
    const isOwnProfile = userData.login?.uuid === personalData.login?.uuid;

    // Se o usuário não está seguido, adicioná-lo aos sugeridos
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!isFollowed) {
            addToSuggestedUsers(userData);  // Adiciona o usuário atual à lista de sugeridos se não for seguido e não for o próprio
        }
    }, [userData]);

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 items-center px-4 py-4 bg-blue-600 text-white shadow-md">
                <div></div>
                <div className="font-bold text-center text-lg sm:text-xl">Find Someone Like You</div>
                <button
                    className="bg-white text-blue-600 font-semibold py-1 px-3 rounded-full hover:bg-blue-100 transition"
                    onClick={handleClick}
                >
                    Next One
                </button>
            </div>

            {/* Background & Profile Picture */}
            <div className="relative h-48 sm:h-64 md:h-80">
                <Image
                    src={usePersonalImages ? backgroundPic : userData.picture?.thumbnail}
                    alt="background picture"
                    className="object-cover w-full h-full"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
                    <Image
                        src={usePersonalImages ? profilePic : userData.picture?.medium}
                        alt="profile picture"
                        fill
                        className="rounded-full border-4 border-white shadow-xl object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>

            {/* User Info */}
            <div className="mt-16 text-center px-6 py-4">
                {/* Só exibir o botão de follow se não for o próprio perfil */}
                {!isOwnProfile && (
                    <button
                        className={`font-semibold py-2 px-6 rounded-full transition ${
                            isFollowed
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        onClick={() => handleFollow(userData)} // Passando userData para a função
                    >
                        {isFollowed ? 'Following' : 'Follow'}
                    </button>
                )}
                <h3 className="mt-4 text-2xl font-bold text-gray-800">
                    {userData?.name?.first} {userData?.name?.last}
                </h3>
                <p className="text-gray-500">
                    {userData?.location?.city}, {userData?.location?.country}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <div className="p-4 bg-gray-100 rounded-lg shadow">
                    <h4 className="font-bold text-gray-700">Personal Info</h4>
                    <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow">
                    <h4 className="font-bold text-gray-700">About</h4>
                    <p className="text-gray-600 mt-2">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        </div>
    );
}
