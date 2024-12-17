
import { getRandomUser } from '@/app/actions'
import ProfileCard from '../../components/personal-profile/index'
import * as personalData from '../../database/personal-profile.json'
import SuggestionUsersList from '@/components/suggestion-list'


export const Profile = async() => {

    return (
        <div className="flex flex-col max-h-screen-lg w-4/5 mx-auto bg-gray-50">
            <div className="my-10 w-full space-y-8">
                <ProfileCard />
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Suggestions for You</h2>
                    <SuggestionUsersList />
                </div>
            </div>
        </div>
    )
}
