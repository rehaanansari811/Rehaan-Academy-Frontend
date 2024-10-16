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
import { courseRequest } from '../../redux/actions/contactAction';
import toast from 'react-hot-toast';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const dispatch = useDispatch();

  const {
    loading,
    error,
    message: contactUsMsg,
  } = useSelector(state => state.contact);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
    setName('');
    setEmail('');
    setCourse('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (contactUsMsg) {
      toast.success(contactUsMsg);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, contactUsMsg]);

  return (
    <Container h={'90vh'}>
      <VStack h={'full'} mt={'12'} justifyContent={'center'} spacing={'5'}>
        <Heading children="Request for a Course" />
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
            <FormLabel htmlFor="course" children="Course info" />
            <Textarea
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="enter course details..."
              type="text"
              focusBorderColor="yellow.400"
            />
          </Box>
          <Button
            isLoading={loading}
            my={'4'}
            colorScheme="yellow"
            type="submit"
          >
            Send
          </Button>
          <Box my={'4'}>
            See available courses?{' '}
            <Link to="/courses">
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

export default Request;
