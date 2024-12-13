import Image from 'next/image'

export const Profile = () => {
    return (
        <div className="h-screen my-10 max-w-[800px] mx-auto bg-yellow-400 shadow rounded">
            <div className=" h-60 bg-[url('./images/background_profile.jpg')] bg-cover bg-no-repeat "> 
                <div className='mx-auto items-center justify-center flex w-[600px] h-[600px]'>
                    <Image
                        src='/images/profile_picture.jpeg'
                        alt={'profile picture'}
                        className="object-cover rounded-t-3xl"
                        fill
                        >
                        </Image>   
                </div>
                
            </div>  

        </div>
    )
}