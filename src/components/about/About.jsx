import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import introVideo from '../../assets/videos/intro.mp4'
import myAvatar from '../../assets/images/mypic.png'
import { RiSecurePaymentFill } from 'react-icons/ri'
import termsAndConditions from '../../assets/docs/termsAndCondition'

const Founder = () => (
    <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
        <VStack alignItems={['center']}>
            <Avatar boxSize={['40', '48']} src={myAvatar} />
            <Text children="Co-Founder" opacity={'.9'} />
        </VStack>
        <VStack justifyContent={['left','center']} alignItems={['center', 'flex-start']}>
            <Heading children="Rehaan Ansari" size={['md', 'xl']} />
            <Text
                textAlign={['center','left']}
                children={"Experienced web developer with a passion for crafting seamless, visually appealing websites and enhancing user experiences."}
            />
        </VStack>
    </Stack>
)

const VideoPlayer = () => (
    <Box>
        <video
            autoPlay
            muted
            controls
            controlsList='nodownload nofullscreen noremoteplayback'
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}
            className='about-Video'
        >
        </video>
    </Box>
)

const TandC = ({ termsAndConditions }) => (
    <Box mt={5}>
        <Heading size={'md'} my={4} children="Terms and Condition" textAlign={['center', 'left']} />
        <Box h={'sm'} p={'4'} overflowY={'scroll'}>
            <Text
                textAlign={['center', 'left']}
                fontFamily={'heading'}
                letterSpacing={'widest'}
            >
                {termsAndConditions}
            </Text>
            <Heading
                my={'4'}
                size={'xs'}
                children="Refund only applicable for cancellation within 7 days."
            />
        </Box>
    </Box>
)
const About = () => {
    return (
        <Container maxW={'container.lg'} padding={['8','16']} boxShadow={'lg'}>
            <Heading children='About Us' textAlign={['center', 'left']} pl={[0, 10]} />
            <Founder />
            <Stack m={8} direction={['column', 'row']} alignItems={'center'}>
                <Text fontFamily={'body'} textAlign={['center', 'left']} children="We are a education providing platform with some premium courses available only for premium members" />
                <Link to='/subscribe'>
                    <Button colorScheme='yellow'>
                        Checkout Our Plans
                    </Button>
                </Link>
            </Stack>
            <VideoPlayer />
            <TandC termsAndConditions={termsAndConditions} />
            <HStack my={4} p={4}>
                <RiSecurePaymentFill />
                <Heading
                    size={'xs'}
                    fontFamily={'sans-serif'}
                    textTransform={'uppercase'}
                    children={'Payment is secured by Razorpay'}
                />
            </HStack>
        </Container>
    )
}

export default About