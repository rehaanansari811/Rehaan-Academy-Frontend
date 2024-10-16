import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/userAction';


export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  height: '100%',
  border: 'none',
  color: 'white',
  backgroundColor: '#D69E2E',
};

const fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imgPrev, setImgPrev] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    dispatch(register(myForm));
  };

  return (
    <Container height={''}>
      <VStack height={'full'} justifyContent={'center'} spacing={16} pt={'6'}>
        <Heading children="Register Now" />
        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box display={'flex'} justifyContent={'center'}>
            <Avatar size={'2xl'} src={imgPrev} />
          </Box>
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
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="enter your password"
              type="password"
              focusBorderColor="yellow.400"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              required
              accept="image/*"
              type={'file'}
              id="chooseAvatar"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>
          <Button my={'4'} colorScheme="yellow" type="submit">
            Register
          </Button>
          <Box my={'4'}>
            Old User?{' '}
            <Link to="/login">
              <Button colorScheme="yellow" variant={'link'}>
                Login
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Register;
