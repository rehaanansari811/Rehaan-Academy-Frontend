import {
  Avatar,
  Button,
  Image,
  Container,
  HStack,
  Heading,
  Stack,
  Input,
  Text,
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from '../../redux/actions/profileAction';
import toast from 'react-hot-toast';
import {
  cancelSubscription,
  getMyProfile,
} from '../../redux/actions/userAction';

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const {
    loading: subsLoading,
    message: subsMessage,
    error: subsError,
  } = useSelector(state => state.subscription);

  const removeFromPlaylistHandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(getMyProfile());
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(getMyProfile());
  };

  const cancelSubscriptionHandler = async () => {
    dispatch(cancelSubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    if (subsMessage) {
      toast.success(subsMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(getMyProfile());
    }

    if (subsError) {
      toast.error(subsError);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error, message, subsError, subsMessage]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Container minH={'95vh'} maxW="container.lg" py={'8'}>
      <Heading m={8} textTransform={'uppercase'}>
        Profile
      </Heading>
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        padding={8}
      >
        <VStack>
          <Avatar boxSize={'48'} src={user.avatar.url}  boxShadow={'0 0 10px rgba(0, 0, 0, 0.3)'}/>
          <Button
            isLoading={loading}
            colorScheme="yellow"
            onClick={onOpen}
            variant={'ghost'}
          >
            change photo
          </Button>
        </VStack>

        <VStack spacing={4} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children={'Name'} fontWeight={'bold'} />
            <Text children={user.name} />
          </HStack>{' '}
          <HStack>
            <Text children={'Email'} fontWeight={'bold'} />
            <Text children={user.email} />
          </HStack>{' '}
          <HStack>
            <Text children={'Created At'} fontWeight={'bold'} />
            <Text children={user.createdAt.split('T')[0]} />
          </HStack>{' '}
          <HStack>
            <Text children={'Role'} fontWeight={'bold'} />
            <Text children={user.role} />
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription && user.subscription.status === 'active' ? (
                <Button
                  isLoading={subsLoading}
                  onClick={cancelSubscriptionHandler}
                  colorScheme="red"
                  variant={'ghost'}
                >
                  Cancel Subscription
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme="yellow">Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateProfile">
              <Button>Update Profile</Button>
            </Link>
            <Link to="/changePassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading size={'md'} my={8}>
        Playlist
      </Heading>
      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap={'wrap'}
          p={'4'}
        >
          {user.playlist.map((elem, index) => (
            <VStack
              borderRadius={3}
              boxShadow={'0 0 10px rgba(0, 0, 0, 0.3)'}
              key={index}
              py={5}
            >
              <Image
                boxSize={'full'}
                objectFit="contain"
                src={elem.poster}
                w={'200px'}
              />
              <HStack>
                <Link to={`/course/${elem.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>
                <Button onClick={() => removeFromPlaylistHandler(elem.course)}>
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}
      <ChangePhotoBox
        changeImageSubmitHandler={changeImageSubmitHandler}
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
      />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const [imgPrev, setImgPrev] = useState('');
  const [image, setImage] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImgPrev('');
    setImage('');
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={8}>
                <Avatar src={imgPrev} boxSize={48} />
                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />
                <Button
                  isLoading={loading}
                  w={'full'}
                  colorScheme="yellow"
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr={4} onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
