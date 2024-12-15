'use server'

export const getRandomUser = async() => {
    const response = await fetch('https://randomuser.me/api/')
    return response.json()
}