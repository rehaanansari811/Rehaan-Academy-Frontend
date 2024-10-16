import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseLectures } from '../../redux/actions/courseAction';
import Loader from '../layout/loader/Loader';

const CourseDetailsPage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);
  const { lectures, loading } = useSelector(state => state.course);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box
            style={{
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <video
              width={'100%'}
              controls
              src={lectures[lectureNumber].video.url}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
            />
            <Heading
              m={4}
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}
            ></Heading>
            <Heading m={4} children={'Description'}></Heading>
            <Text m={4}>{lectures[lectureNumber].title}</Text>
          </Box>
          <VStack>
            <Heading my={5}>Lectures</Heading>
            {lectures.map((item, index) => (
              <button
                onClick={() => setLectureNumber(index)}
                key={item._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  margin: 0,
                  textAlign: 'center',
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
              >
                <Text noOfLines={1}>
                  #{index + 1} {item.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <>
          <Box display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}>
            <Heading
              children={'No Lectures Available Now...'}
              alignContent={'center'}
              textAlign={'center'}
              
            />
          </Box>
        </>
      )}
    </Grid>
  );
};

export default CourseDetailsPage;