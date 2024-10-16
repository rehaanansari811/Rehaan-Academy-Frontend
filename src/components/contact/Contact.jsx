import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { contactUs } from '../../redux/actions/contactAction';
import toast from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const {
    loading,
    error,
    message: contactUsMsg,
  } = useSelector(state => state.contact);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (contactUsMsg) {
      toast.success(contactUsMsg);
      dispatch({ type: 'clearMessage' });
      setName("");
      setEmail("");
      setMessage("");
    }
  }, [dispatch, error, contactUsMsg]);

  return (
    <Container h={'90vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'5'}>
        <Heading children="Contact us" />

        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="enter name"
              type="name"
              focusBorderColor="yellow.400"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type="email"
              focusBorderColor="yellow.400"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="message" children="Message" />
            <Textarea
              required
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="enter message..."
              type="text"
              focusBorderColor="yellow.400"
            />
          </Box>
          <Button isLoading={loading} my={'4'} colorScheme="yellow" type="submit">
            Send
          </Button>
          <Box my={'4'}>
            Request for a course?{' '}
            <Link to="/request">
              <Button colorScheme="yellow" variant={'link'}>
                Click here
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Contact;
