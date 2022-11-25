
import { Text} from '@mantine/core';
export default function Empty(props){
    return (
        <div className='flex flex-col items-center w-100 '>
                <div>
                    <Text fs="italic" fw={700} ta="center"  c="dimmed" fz="lg">{props.text}</Text>
                </div>
        </div>
    )
}