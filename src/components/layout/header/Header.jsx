import React, { useState } from 'react';
// import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  ModalCloseButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  RiDashboardFill,
  RiLoginBoxLine,
  RiMenu5Fill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/userAction';

const LinkButton = ({ url = '/', title = 'home', onClose }) => (
  <Link to={url} onClick={onClose}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  };
  return (
    <>
      <Button
        colorScheme="yellow"
        w={12}
        height={12}
        rounded="full"
        position={'fixed'}
        top={6}
        left={6}
        onClick={onOpen}
        zIndex={99}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(3px)'} />
        <DrawerContent >
            <DrawerCloseButton mt={"10px"} ml={"10px"} fontSize={"14px"} backgroundColor={"gray.100"}/>
          <DrawerHeader
            borderBottomWidth={'1px'}
            paddingLeft={'15px'}
            color={'#d69e2e'}
            fontSize={25}
          >
            REHAAN ACADEMY
          </DrawerHeader>
          <DrawerBody>
            <VStack alignItems="left">
              <LinkButton onClose={onClose} url="/" title="Home" />

              <LinkButton
                onClose={onClose}
                url="/courses"
                title="Browse All Courses"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request A Course"
              />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About Us" />
            </VStack>
            <HStack
              justifyContent={'space-evenly'}
              position={'absolute'}
              bottom={'2rem'}
              width={'80%'}
            >
              {isAuthenticated ? (
                <>
                  <VStack>
                    <HStack>
                      <Link to="/profile" onClick={onClose}>
                        <Button variant={'ghost'} colorScheme="yellow">
                          Profile
                        </Button>
                      </Link>
                      <Button variant={'ghost'} onClick={logoutHandler}>
                        <RiLoginBoxLine />
                        Logout
                      </Button>
                    </HStack>
                    {user && user.role === 'admin' && (
                      <Link to="/admin/dashboard" onClick={onClose}>
                        <Button colorScheme="purple" variant={'ghost'}>
                          <RiDashboardFill style={{ margin: '4px' }} />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                  </VStack>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={onClose}>
                    <Button colorScheme="yellow">Login</Button>
                  </Link>
                  <p>or</p>
                  <Link to="/register" onClick={onClose}>
                    <Button colorScheme="yellow">Register</Button>
                  </Link>
                </>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* <ColorModeSwitcher /> */}
    </>
  );
};

export default Header;
