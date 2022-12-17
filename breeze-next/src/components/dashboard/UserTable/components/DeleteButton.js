import { useDeleteUser } from '../hooks/useDeleteUser'
import { Loading } from './Loading'

export const DeleteButton = ({ id, reload }) => {
    const { handleDeleteUser, isLoading } = useDeleteUser(reload)
    return (
        <button
            onClick={() => handleDeleteUser(id)}
            type="button"
            className="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-20 px-5 py-2.5 mr-2 mb-2">
            {isLoading ? <Loading /> : '削除'}
        </button>
    )
}
