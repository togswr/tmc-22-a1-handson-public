import { Loading } from './components/Loading'
import { Row } from './components/Row'
import { Th } from './components/Th'
import { useUsers } from './hooks/useUsers'

export const UserTable = () => {
    const { users, isLoading, loadUsers } = useUsers()

    return (
        <section className="py-12 overflow-x-auto relative">
            {isLoading && (
                <div className="w-full flex flex-row justify-center items-center">
                    <p className="mr-1">Loading...</p>
                    <Loading />
                </div>
            )}
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <Th>ユーザー名</Th>
                        <Th>メールアドレス</Th>
                        <Th>削除</Th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <Row
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            email={user.email}
                            reload={loadUsers}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}
