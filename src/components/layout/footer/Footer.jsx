import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import { TiSocialYoutubeCircular, TiSocialInstagramCircular, TiSocialGithubCircular ,TiSocialLinkedinCircular} from 'react-icons/ti'
import { } from 'react-icons/di'
const Footer = () => {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width='full'>
          <Heading children="All Rights Reserved" color={'white'} />
          <Heading fontFamily={'body'} size={'sm'} children="Rehaan Academy" color={'yellow.400'} />
        </VStack>
        <HStack spacing={['2', '10']} justifyContent={'center'} color={'white'} fontSize={50} >
          <Link to="https://www.linkedin.com/in/rehaan-ansari" target='blank' className='footer-links'>
            <TiSocialLinkedinCircular />
          </Link>
          <Link to="https://github.com/rehaanansari811" target='blank' className='footer-links'>
            <TiSocialGithubCircular />
          </Link>
          <Link to="https://www.instagram.com/the_ansariii/?hl=en" target='blank' className='footer-links'>
            <TiSocialInstagramCircular />
          </Link>
          <Link to="#" target='blank' className='footer-links'>
            <TiSocialYoutubeCircular />
          </Link>
        </HStack>
      </Stack>
    </Box>
  )
}

export default Footer