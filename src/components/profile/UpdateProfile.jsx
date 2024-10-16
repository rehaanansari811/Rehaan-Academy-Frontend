import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profileAction';
import { getMyProfile } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(getMyProfile());
    navigate('/profile');
  };
  const { loading } = useSelector(state => state.profile);

  return (
    <Container py={16} minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          children="Update Profile"
          my={16}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="name"
            type="text"
            focusBorderColor="yellow.400"
            required
          />
          <Input
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
            type="text"
            focusBorderColor="yellow.400"
            required
          />

          <Button
            isLoading={loading}
            w={'full'}
            colorScheme="yellow"
            type="submit"
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
