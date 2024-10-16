import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../../auth/Register';

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addlectureHandler,
  courseTitle,
  lectures,
  loading,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      size={'full'}
      onClose={handleClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={'16'}>
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my={'5'}>
                <Heading children={courseTitle} />
                <Heading
                  children={`course id: #${id}`}
                  size={'sm'}
                  opacity={0.4}
                  pt={'10px'}
                />
              </Box>
              <Heading children={'Lectures'} size={'lg'} />

              {lectures.map((item, key) => (
                <VideoCard
                  key={key}
                  title={item.title}
                  description={item.description}
                  num={key + 1}
                  lectureId={item._id}
                  courseId={id}
                  deleteButtonHandler={deleteButtonHandler}
                  loading={loading}
                />
              ))}
            </Box>
            <Box>
              <form
                onSubmit={e =>
                  addlectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children={'Add lectures'}
                    size={'md'}
                    textTransform={'uppercase'}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    value={title}
                    placeholder="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    value={description}
                    placeholder="description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Input
                    required
                    accept="video/mp4"
                    type={'file'}
                    focusBorderColor="purple.400"
                    css={{
                      '&::file-selector-button': {
                        ...fileUploadCss,
                        color: 'white',
                        backgroundColor: '#6B46C1',
                      },
                    }}
                    onChange={changeVideoHandler}
                  />
                  {videoPrev && (
                    <video
                      controls
                      src={videoPrev}
                      controlsList="nodownload"
                      style={{
                        borderRadius: '5px',
                        boxShadow: '0 0 10px rgba(107,70,193,0.5)',
                      }}
                    ></video>
                  )}
                  <Button
                    isLoading={loading}
                    w={'full'}
                    colorScheme="purple"
                    type="submit"
                  >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
  loading,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my={'8'}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>

      <Button
        color={'purple.600'}
        onClick={() => deleteButtonHandler(courseId, lectureId)}
        isLoading={loading}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
