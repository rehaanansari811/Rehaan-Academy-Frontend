import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buySubscription } from '../../redux/actions/userAction';
import { server } from '../../redux/store';
import { toast } from 'react-hot-toast';
import logo from '../../assets/images/mypic.jpeg';

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setkey] = useState('');
  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(
    state => state.course
  );

  const subscribeHandler = async () => {
    const { data } = await axios.get(`${server}/razorpaykey`);
    setkey(data.key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopup = () => {
        const options = {
          key,
          name: 'Rehaan Academy',
          description: 'Get access to all premium content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentVerification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Rehaan Academy Welcomes You',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopup();
    }
  }, [dispatch, error, user.name, user.email, key, subscriptionId,courseError]);

  return (
    <Container h={'90vh'} p={'16'}>
      <Heading children="Welcome" my="8" textAlign={'center'} />
      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={0}
      >
        <Box bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'} children={`Pro Pack - ₹299.00`} />
        </Box>
        <Box p={'4'} textAlign={'center'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children={`Join pro pack and get access to all content.`} />
            <Heading size={'md'} children={'₹299 Only'} />
          </VStack>
          <Button
            my="8"
            w={'full'}
            colorScheme="yellow"
            onClick={subscribeHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>
        <Box
          bg={'blackAlpha.600'}
          p={'4'}
          css={{ borderRadius: '0 0 8px 8px' }}
        >
          <Heading
            color={'white'}
            textTransform={'uppercase'}
            size={'sm'}
            children={'100% refund at cancellation'}
          />
          <Text
            fontSize={'xs'}
            color={'white'}
            children={'*Terms & Condition'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
