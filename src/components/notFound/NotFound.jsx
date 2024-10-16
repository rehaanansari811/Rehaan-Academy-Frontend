import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react'
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <Container h={'90vh'} p={'16'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <VStack>
        <Heading my={'8'} textAlign={'center'} >
          Page Not Found
        </Heading>
        <Heading size={'3xl'}>
          <RiErrorWarningFill />
        </Heading>
        <Text mb={'8'} fontWeight={'bold'} textAlign={'center'}> ERROR:404</Text>

        <Link to={'/'}>
          <Button variant={'solid'} borderRadius={'50px'} colorScheme='yellow' >Go to home</Button>
        </Link>
      </VStack>
    </Container>
  )
}

export default NotFound