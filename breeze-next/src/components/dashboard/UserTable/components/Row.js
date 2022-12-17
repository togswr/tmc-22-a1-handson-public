import { Td } from './Td'
import { DeleteButton } from './DeleteButton'

export const Row = ({ id, name, email, reload }) => {
    return (
        <tr>
            <Td>{name}</Td>
            <Td>{email}</Td>
            <Td>
                <DeleteButton id={id} reload={reload} />
            </Td>
        </tr>
    )
}
