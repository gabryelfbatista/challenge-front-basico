import Image from 'next/image'
import profilePic from '../../images/profile_picture.jpeg'
import backgroundPic from '../../images/background_profile.jpg'

export const Profile = () => {
    return (
        <div className="flex flex-col max-h-screen-lg max-w-screen-lg mx-auto">
            <div className="max-h-full mt-10 w-full shadow rounded"> 
                <div className="h-20 sm:h-28 md:h-48 lg:h-48">
                    <Image 
                        src={backgroundPic}
                        alt={'background picture'}
                        className="object-contain object-top w-full" 
                    >
                    </Image>
                </div>
                <div className='relative mx-auto h-16 w-16 sm:h-32 sm:w-32 md:h-40 md:w-40 '>
                    <Image
                        src={profilePic}
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
                    <div className='mx-auto my-5'>Nome</div>
                    <div className='mx-auto mb-5'>Endereço</div>
                </div>

                    
            </div>
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