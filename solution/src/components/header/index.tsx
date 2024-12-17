'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import profilePic from '../../../public/profile_picture.jpeg';
import personalData from '../../database/personal-profile.json'

export const Header = () => {
    const [followedUsers, setFollowedUsers] = useState<any[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Carregar os usuários seguidos dos cookies ao montar o componente
    useEffect(() => {
        const cookies = parseCookies();
        const storedFollowedUsers = cookies.followedUsers ? JSON.parse(cookies.followedUsers) : [];
        setFollowedUsers(storedFollowedUsers);
    }, []);

    return (
        <header className="w-full bg-blue-600 text-white shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-2">
                {/* Foto de Perfil e Nome */}
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 md:h-12 md:w-12">
                        <Image
                            src={profilePic}
                            alt="Profile Picture"
                            className="rounded-full object-cover border-2 border-white shadow"
                            width={48}
                            height={48}
                        />
                    </div>
                    <div>
                        <h1 className="text-base md:text-lg font-semibold">{personalData.name.first} {personalData.name.last}</h1>
                    </div>
                </div>

                {/* Dropdown de Usuários Seguidos */}
                <div className="relative">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        Followed Users
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-md shadow-lg z-10">
                            {followedUsers.length > 0 ? (
                                <ul className="max-h-60 overflow-y-auto">
                                    {followedUsers.map((user, index) => (
                                        <li
                                            key={user.login?.uuid || index}
                                            className="flex items-center px-3 py-2 hover:bg-gray-100"
                                        >
                                            <div className="h-8 w-8 relative mr-2">
                                                <Image
                                                    src={user.picture?.medium || '/path/to/default-avatar.jpg'}
                                                    alt={user.name?.first}
                                                    className="rounded-full object-cover"
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {user.name?.first} {user.name?.last}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {user.location?.city}, {user.location?.country}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="px-4 py-2 text-center text-gray-500 text-sm">
                                    No users followed
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
