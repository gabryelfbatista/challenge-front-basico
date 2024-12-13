import Image from 'next/image'
import profilePic from '../../images/profile_picture.jpeg'

export const Profile = () => {
    return (
        <div>
            <div className="max-h-[500px] mt-10 max-w-[800px] mx-auto bg-[url('./images/background_profile.jpg')] bg-contain bg-no-repeat shadow rounded">
                <div className="grid grid-rows-2 h-full"> 
                    <div className='flex flex-col space-y-4 place-items-center w-auto h-full'>
                        <Image
                            src={profilePic}
                            alt={'profile picture'}
                            className="object-cover rounded-full shadow-black mt-40"
                            width={200}
                            height={200} 
                            >
                        </Image>  
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                            Follow
                        </button>
                        <div>Nome</div>
                    </div>
                    
                </div>  
            </div>
            <div className="grid grid-cols-2 justify-between max-h-[400px] mt-2 max-w-[800px] mx-auto shadow rounded">
                <div className="w-11/12 mr-4">
                    OI
                </div>
                <div className="w-11/12 pl-4">oi</div>
            </div>
        </div>
    )
}