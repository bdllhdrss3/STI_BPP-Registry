

import { Grid } from '@mantine/core';
import { Text } from '@mantine/core';
import { Avatar } from '@mantine/core';
import ChangeHeadOfBureau from './ChangeHeadOfBureau';
import AssignBureauLead from './AssignBureauLead'

export default function BureauHeadsListItem(props){
    return(
        <Grid className='mx-5'>
            <Grid.Col span={1}>
                <Avatar  size="md" color="green" radius="xl">B</Avatar>
            </Grid.Col>
            <Grid.Col span={8} className="pl-6">
                <Text fw={500} >{props.bureau.name}</Text>
                    <Text fz="xs" c="dimmed">
                        {props.bureau.head_of_bureau && props.bureau.head_of_bureau.first_name + " " + props.bureau.head_of_bureau.last_name}
                    </Text>
                    <Text fz="xs" c="blue">{!props.bureau.head_of_bureau  && "No bureau lead"}</Text>
            </Grid.Col>
            <Grid.Col span={2}>
                
            <AssignBureauLead data={props}/>
            </Grid.Col>
            
        </Grid>
    )
}



//                {/* {props.bureau.head_of_bureau ? <ChangeHeadOfBureau/>  : <AssignBureauLead data={props}/> } */}