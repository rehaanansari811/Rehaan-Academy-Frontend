import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { fileUploadCss } from '../../auth/Register';
import { createCourse } from '../../../redux/actions/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast'

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [image, setimage] = useState('');
  const [category, setcategory] = useState('');
  const [createdBy, setcreatedBy] = useState('');
  const [imagePrev, setimagePrev] = useState('');
  const dispatch = useDispatch();
  const {loading, error, message} = useSelector(state=>state.admin)

  const categories = [
    'Web development',
    'Artificial Intelligence',
    'Data Structures & Algorithms',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimagePrev(reader.result);
      setimage(file);
    };
  };

  const submitHandler = (e) => {
    // title, description, category, createdBy, file
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);

    dispatch(createCourse(myForm));
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
  }, [dispatch, error, message]);

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Container py={'16'}>
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={'uppercase'}
            children={'Create a new course'}
            my={'16'}
            textAlign={['center', 'left']}
          />
          <VStack my={'auto'} spacing={8}>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              focusBorderColor="purple.400"
            />
            <Input
              id="description"
              value={description}
              onChange={e => setdescription(e.target.value)}
              placeholder="Description"
              type="text"
              focusBorderColor="purple.400"
            />
            <Input
              id="createdBy"
              value={createdBy}
              onChange={e => setcreatedBy(e.target.value)}
              placeholder="Creater name"
              type="text"
              focusBorderColor="purple.400"
            />
            <Select
              focusBorderColor="purple.400"
              value={category}
              onChange={e => setcategory(e.target.value)}
            >
              <option value="" disabled>
                Category
              </option>
              {categories.map(item => (
                <option value={item}>{item}</option>
              ))}
            </Select>
            <Input
              required
              accept="image/*"
              type={'file'}
              focusBorderColor="purple.400"
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'white',
                  backgroundColor: '#6B46C1',
                },
              }}
              onChange={changeImageHandler}
            />
            {imagePrev && (
              <Image src={imagePrev} boxSize={'64'} objectFit={'contain'} />
            )}
            <Button w={'full'} isLoading={loading} colorScheme="purple" type="submit">
              Create
            </Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
