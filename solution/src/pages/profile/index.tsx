import ProfileCard from '../../components/personal-profile/index'


const getRandomUser = async() => {
    const response = await fetch('https://randomuser.me/api/')
    return response.json()
}

let usersList: Array<Object> = []

export const Profile = async () => {

    const data = await getRandomUser()
    console.log(data.results[0])
    let randomUserData = data.results[0]
    // usersList.push(randomUserData)
    return (
        <div className="flex flex-col max-h-screen-lg w-4/5 mx-auto">
            <ProfileCard usersList={usersList}/>
            <div className="grid md:grid-cols-2 justify-between max-h-[400px] mt-2 w-full mx-auto rounded">
                <div className="flex-col max-h-full max-w-full justify-sart pl-6 mr-1 shadow">
                    <div className='font-bold'>Personal info</div>
                    <div>About</div>
                </div>
                <div className="flex-col max-h-full sm:w-screen md:w-full justify-sart pl-6 ml-1 shadow">oi</div>
            </div>
        </div>
    )
}
