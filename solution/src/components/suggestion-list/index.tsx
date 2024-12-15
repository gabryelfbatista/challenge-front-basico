'use client';
import { parseCookies } from 'nookies';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SuggestionUsersList() {
    const [usersList, setUsersList] = useState<any[]>([]);
    const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

    useEffect(() => {
        try {
            // Lê os cookies para obter a lista de usuários
            const cookies = parseCookies();
            const storedUsersList = cookies.usersList ? JSON.parse(cookies.usersList) : [];
            
            // Verifica se a lista é um array válido antes de atualizar o estado
            if (Array.isArray(storedUsersList)) {
                setUsersList(storedUsersList);
                console.log('Loaded users from cookies:', storedUsersList);
            } else {
                console.warn('Invalid usersList structure in cookies:', storedUsersList);
                setUsersList([]);
            }
        } catch (error) {
            console.error('Error loading users from cookies:', error);
            setUsersList([]);
        }
    }, []);

    const handleFollow = (userId: string) => {
        setFollowedUsers((prevFollowed) => {
            const updatedFollowed = new Set(prevFollowed);
            if (updatedFollowed.has(userId)) {
                updatedFollowed.delete(userId); // Unfollow se já seguir
            } else {
                updatedFollowed.add(userId); // Follow
            }
            return updatedFollowed;
        });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {usersList.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">
                    No users available.
                </div>
            ) : (
                usersList.map((user, index) => (
                    <div
                        key={user.login?.uuid || index} // Usa `uuid` se disponível, ou o índice como fallback
                        className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                        <div className="relative mx-auto h-20 w-20 sm:h-32 sm:w-32">
                            <Image
                                src={user.picture?.large || '/path/to/default-avatar.jpg'}
                                alt={`${user.name?.first || 'Unknown'} ${user.name?.last || 'User'}`}
                                fill
                                className="rounded-full object-cover object-center"
                            />
                        </div>
                        <button
                            className={`mt-3 mx-auto block py-1 px-3 rounded-full ${
                                followedUsers.has(user.login?.uuid)
                                    ? 'bg-green-500 text-white'
                                    : 'bg-blue-500 text-white'
                            }`}
                            onClick={() => handleFollow(user.login?.uuid || '')}
                        >
                            {followedUsers.has(user.login?.uuid) ? 'Following' : 'Follow'}
                        </button>
                        <div className="mt-2 text-center">
                            <h3 className="text-lg font-semibold">
                                {user.name?.first || 'Unknown'} {user.name?.last || 'User'}
                            </h3>
                            <p className="text-gray-500">
                                {user.location?.city || 'Unknown City'}, {user.location?.country || 'Unknown Country'}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
