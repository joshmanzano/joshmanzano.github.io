import { useState } from 'react'
import './App.css';
import { Container, Group, Center, Grid, Loader, ScrollArea, Stack, Col, Text, Title, Paper, Image, Button, TextInput, ActionIcon} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconBrandGithub, IconArrowRight, IconBrandTelegram, IconBrandLinkedin, IconBrandInstagram, IconBrandTwitter} from '@tabler/icons-react';

export function SocialButton({name, href, icon}) {
  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      color="dark"
      leftIcon={icon}
      variant="subtle"
    >
    </Button>
  );
}

function App() {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const locale = 'en'
  const [input, setInput] = useInputState('');
  const [loading, setLoading] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [messages, setMessages] = useState([
    {text: 'Hello! I am a chatbot made by Josh to answer questions about himself.', user: 'Josh'},
    {text: 'Go ahead and ask me anything you are curious about!', user: 'Josh'}
  ]);

  const sendMessage = async () => {
    setLoading(true)
    const messages_with_user_input = [...messages, { text: input, user: 'You' }]
    setMessages(messages_with_user_input)
    setInput('')

    const apiUrl = 'https://catfact.ninja/fact'; 
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Process your data here
      console.log(data); // Just an example of what you could do with the data
      const bot_reply = 'Unfortunately, Josh has not implemented this chatbot yet. For now, have a cat fact: ' + data.fact
      const messages_with_bot_reply = [...messages_with_user_input, { text: bot_reply, user: 'Josh' }]
      setMessages(messages_with_bot_reply)
      setDisableInput(true)
      // You might want to update your state with this new data
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      // Handle errors, for example, by setting an error message in your component's state
    } finally {
      setLoading(false); // Reset loading state after API call is done, regardless of success or failure
    }
  };

  return (
    <div>
    <Container mt="xl" mb="xl">
      <Container>
        <Grid mt="lg" mb="lg" gutter="lg">
          <Col span={12} sm={6} md={6}>
            
            <Title order={2} mb="xl" className="title" align="center">
              Josh Manzano
            </Title>
            <Image radius="xl" src="josh_pfp_700.png"/>
            <Group mt="md" position="center">
              <SocialButton name='GitHub' href='https://github.com/joshmanzano' icon={<IconBrandGithub color='black'/>}/>
              <SocialButton name='LinkedIn' href='https://www.linkedin.com/in/joshmanzano-dev/' icon={<IconBrandLinkedin color='black'/>}/>
              <SocialButton name='Contact Me' href='https://joshmanzano.com/contact' icon={<IconBrandTelegram color='black'/>}/>
              <SocialButton name='Twitter' href='https://twitter.com/joshmanzano_dev' icon={<IconBrandTwitter color='black'/>}/>
              <SocialButton name='Instagram' href='https://instagram.com/joshmanzano.dev' icon={<IconBrandInstagram color='black'/>}/>
              {/* <SocialButton name='Youtube' href='https://youtube.com/@joshmanzano' icon={<IconBrandYoutube color='black'/>}/> */}
            </Group>
          </Col>
          <Col span={12} sm={6} md={6}>
            <Paper withBorder p="md">

            <ScrollArea h={450}>
              {messages.map((message) => {
                return(
                  <Paper className={message.user === 'Josh' ? 'bot' : 'user'} withBorder mt="xs" mb="xs" shadow="xs" p="xs">
                    <Text className="text" align="center">{message.text}</Text>
                  </Paper>
                )
              })}
              {loading && 
                <Center mt="xl"><Loader/></Center>
              }
            </ScrollArea>

            <TextInput mt="xs" radius="xl" size="md" 
            value={input}
            onChange={setInput}
            onKeyDown={handleKeyDown}
            disabled={loading || disableInput}
            rightSection={
              <ActionIcon onClick={() => sendMessage(input)} size={32} radius="xl" color={"blue"} variant="filled">
                <IconArrowRight size="1.1rem" stroke={1.5} />
              </ActionIcon>            
            }
            />
            </Paper>
          </Col>
        </Grid>
      </Container>
      {locale === 'en' && 
      <Title order={2} mb="xl" className="title" align="center">
        Hello there! I'm Josh, a software engineer and indie developer. I enjoy educating people for free and creating accessible, ethical software that benefits people in need.
      </Title>
      }
      {locale === 'jp' && 
      <Title order={2} mb="xl" className="title" align="center">
        ジョシュはシニアソフトウェアエンジニアで、困っている人々に非営利およびオープンソースソフトウェアを提供するのが大好きです！
      </Title>
      }

      <Grid mt="lg" mb="lg" gutter="lg">
        <Col span={12} sm={4} md={4}>
          <Stack>
            <a href="https://www.linkedin.com/company/yahoo/mycompany/" target="_blank" rel="noopener noreferrer">
            <Image src="yahoo.png"/>
            </a>
            <Title order={3} className="title" align="center">
              Senior Engineer
            </Title>
          </Stack>
        </Col>
        <Col span={12} sm={4} md={4}>
          <Stack>
            <a href="https://www.ntust.edu.tw/home.php?Lang=en" target="_blank" rel="noopener noreferrer">
            <Image src="taiwan_tech.png"/>
            </a>
            <Title order={3} className="title" align="center">
              {/* 17+ Open Source Commits */}
              Master's Graduate
            </Title>
          </Stack>
        </Col>
        <Col span={12} sm={4} md={4}>
          <Stack>
            <a href="https://akadsph.com/" target="_blank" rel="noopener noreferrer">
            <Image src="akads.png"/>
            </a>
            <Title order={3} className="title" align="center">
              {/* 8 Software Projects  */}
              Startup Co-Founder
            </Title>
          </Stack>
        </Col>
      </Grid>
    </Container>
    </div>
  );
}


export default App;
