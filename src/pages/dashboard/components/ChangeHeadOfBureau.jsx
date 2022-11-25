import { useState } from 'react';
import { Modal, Button, Group, Text,Input, Select } from '@mantine/core';
import { Container,  Grid } from '@mantine/core';
import logo from "../../../assets/images/logo.png"
import "./style.css"

export default function ChangeHeadOfBureau() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        style={{marginTop: '30px'}}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Container>
            <Grid>
                <Grid.Col span={12}>
                    <img src={logo} alt="logo" className='model-logo text-center mx-auto'></img>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Text ta="center"  fw={700} fz="lg">Change Head Of Bureau</Text>
                    <Text ta="center"  c="dimmed" fz="lg">Industry 4.0+</Text>
                    <Input.Wrapper id="name" label="New Head of Bureau" required>
                      <Select
                        data={['React', 'Angular', 'Svelte', 'Blitz.js']}
                        placeholder="Bureau Head"
                        searchable
                        nothingFound="Nothing found"
                      />
                    </Input.Wrapper>
                    
                </Grid.Col>
            </Grid>
            <div className='flex flex-col items-center w-100 my-4'>
                <Button color="gray" radius="md" size="md" className='create-bureau-btn my-4 '>
                    Create
                </Button>
            </div>
        </Container>
      </Modal>

      <Group position="center">
        <Button color="gray" radius="md" size="md" onClick={() => setOpened(true)}  compact className='change-btn my-1 mx-2'>
          Change
        </Button>
      </Group>
    </>
  );
}