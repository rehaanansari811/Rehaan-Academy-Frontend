import React from 'react'
import { Box, Button, HStack, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import './home.css'
import vg from '../../assets/images/bg.png'
import introVodeo from '../../assets/videos/intro.mp4'
import { CgGoogle, CgYoutube } from "react-icons/cg"
import { SiCoursera, SiUdemy } from "react-icons/si"
import { DiAws } from "react-icons/di"

const Home = () => {
    return (
        <section className='home'>
            <div className="container">
                <Stack
                    direction={["column", "row"]}
                    height={"100%"}
                    justifyContent={['center', 'space-between']}
                    alignItems={"center"}
                    spacing={["16", '56']}
                >
                    <VStack width={'full'} alignItems={['center', 'flex-end']} spacing={5}>
                        <Heading size={'2xl'} children="LEARN FROM THE EXPERTS" />
                        <Text
                            children="Find Valuable Content At Reasonable Price"
                            textAlign={['center','left']}
                        />
                        <Link to="/courses">
                            <Button size={"lg"} colorScheme='yellow'>Explore Now</Button>
                        </Link>
                    </VStack>
                    <Image className='vector-graphics' boxSize={'md'} src={vg} objectFit={'contain'} />
                </Stack>
            </div>
            <Box padding={"8"} bg={"blackAlpha.800"}>
                <Heading children="OUR BRANDS" textAlign={'center'} fontFamily={"body"} color={'yellow.400'} />
                <HStack className='brandsBanner' justifyContent={'space-evenly'} marginTop={[4, 14]}>
                    <CgGoogle />
                    <CgYoutube />
                    <SiCoursera />
                    <SiUdemy />
                    <DiAws />
                </HStack>
            </Box>
            <div className="container2">
                <video
                    controls
                    src={introVodeo}
                    controlsList='nodownload nofullscreen noremoteplayback'
                    disablePictureInPicture
                >

                </video>
            </div>
        </section>
    )
}

export default Home