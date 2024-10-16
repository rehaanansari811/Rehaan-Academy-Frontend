import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react'
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
const PaymentFailure = () => {
  return (
    <Container h={'90vh'} p={'16'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <VStack>
        <Heading my={'8'} textAlign={'center'} >
          Payment Fail
        </Heading>
        <Heading size={'3xl'} mb={8}>
          <RiErrorWarningFill />
        </Heading>
        <Link to={'/subscribe'}>
          <Button variant={'solid'} borderRadius={'50px'} colorScheme='yellow' >Try Again</Button>
        </Link>
      </VStack>
    </Container>
  )
}

export default PaymentFailure