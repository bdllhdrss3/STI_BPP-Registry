

import { Grid } from '@mantine/core';
import { Text } from '@mantine/core';
import { Avatar } from '@mantine/core';
import { Button } from '@mantine/core';

export default function BureauListItem(props){
    return(
        <Grid className='mx-5'>
            <Grid.Col span={1}>
                <Avatar  size="md" color="green" radius="xl">B</Avatar>
            </Grid.Col>
            <Grid.Col span={8} className="pl-6">
                <Text fw={500} >{props.bureau.name}</Text>
                    <Text fz="xs" c="dimmed">Members interested: {props.bureau.members}</Text>
            </Grid.Col>
            <Grid.Col span={2}>
            <Button color="green" className='button' compact>
                see more
            </Button>
            </Grid.Col>
            
        </Grid>
    )
}