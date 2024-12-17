'use client';
import { parseCookies, setCookie } from 'nookies';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SuggestionUsersList() {
    const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);
    const [followedUsers, setFollowedUsers] = useState<any[]>([]);

    // Carregar os cookies ao montar o componente
    useEffect(() => {
        const cookies = parseCookies();
        
        // Carregar listas de cookies, se existirem
        const storedSuggestedUsers = cookies.suggestedUsers ? JSON.parse(cookies.suggestedUsers) : [];
        const storedFollowedUsers = cookies.followedUsers ? JSON.parse(cookies.followedUsers) : [];

        console.log('Cookies carregados:', cookies);

        // Definir as listas de usuários no estado
        setSuggestedUsers(storedSuggestedUsers);
        setFollowedUsers(storedFollowedUsers);
    }, []);

    // Função para seguir um usuário
    const handleFollow = (user: any) => {
        // Adicionar usuário à lista de seguidos, se ainda não estiver
        if (!followedUsers.some((u) => u.login?.uuid === user.login?.uuid)) {
            const updatedFollowedUsers = [...followedUsers, user];

            // Remover usuário da lista de sugeridos
            const updatedSuggestedUsers = suggestedUsers.filter(
                (u) => u.login?.uuid !== user.login?.uuid
            );

            // Atualizar estados com os novos valores
            setFollowedUsers(updatedFollowedUsers);
            setSuggestedUsers(updatedSuggestedUsers);

            // Atualizar cookies
            setCookie(null, 'followedUsers', JSON.stringify(updatedFollowedUsers), {
                path: '/',
                maxAge: 1 * 60 * 60, // 1 hora
            });

            setCookie(null, 'suggestedUsers', JSON.stringify(updatedSuggestedUsers), {
                path: '/',
                maxAge: 1 * 60 * 60, // 1 hora
            });
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {suggestedUsers.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">
                    No users available.
                </div>
            ) : (
                suggestedUsers.map((user, index) => (
                    <div
                        key={user.login?.uuid || index}
                        className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
                    >
                        <div className="relative mx-auto h-20 w-20">
                            <Image
                                src={user.picture?.large || '/path/to/default-avatar.jpg'}
                                alt={`${user.name?.first} ${user.name?.last}`}
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                        <div className="mt-3 text-center">
                            <h3 className="text-lg font-semibold text-gray-700">
                                {user.name?.first} {user.name?.last}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {user.location?.city}, {user.location?.country}
                            </p>
                        </div>
                        <button
                            className="mt-3 block w-full py-2 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                            onClick={() => handleFollow(user)}
                        >
                            Follow
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
