import * as React from 'react'
import { useRouter } from 'next/router'
import {
  Flex,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
  useTheme,
  useMediaQuery
} from '@chakra-ui/react'
import { HamburgerIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { BrandIcon, DeliveryIcon, UserIcon } from 'components/icons'
import { NextChakraLink } from 'components/helpers'
import { BagIconWithBadge } from 'components/bag'

const navigation1 = ['Shipping', 'FAQ', 'Contact']
const navigation2 = ['new release', 'men', 'women', 'kids', 'customize']

function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <HamburgerIcon px={4} w="full" aria-label="Open menu" onClick={onOpen} />

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody p="0">
            {navigation2.map(navItem => (
              <NextChakraLink
                key={navItem}
                href="/"
                display="flex"
                alignItems="center"
                p="1.5rem"
                textTransform="capitalize"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)', textDecoration: 'none' }}
              >
                {navItem}
              </NextChakraLink>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default function TopNavigation() {
  const theme = useTheme()
  const { pathname } = useRouter()
  const [isMobile] = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`)

  return (
    <header>
      <Box bg="brand.gray">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxWidth="1280px"
          w="full"
          h="35px"
          mx="auto"
          fontSize="12px"
          fontWeight="400"
        >
          <Flex alignItems="center" w={[null, null, '15%', '20%']} h="full" ml={6}>
            <Menu>
              {({ isOpen: menuIsOpen }) => (
                <>
                  <MenuButton>
                    {isMobile ? 'En' : 'English'} {menuIsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </MenuButton>
                  <MenuList>
                    <MenuItem>English</MenuItem>
                    <MenuItem>Indonesia</MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Flex>

          <Text display={['none', null, 'initial']} textAlign="center" textTransform="uppercase">
            <DeliveryIcon mr={2} />
            free shipping over $100 purchase
          </Text>

          <Flex as="nav" h="full">
            {navigation1.map(navItem => (
              <NextChakraLink
                key={navItem}
                href="/"
                display="flex"
                alignItems="center"
                px={4}
                py={0}
                h="full"
                textTransform="capitalize"
                _hover={{ textDecoration: 'none' }}
              >
                {navItem}
              </NextChakraLink>
            ))}
          </Flex>
        </Flex>
      </Box>

      <Flex as="nav" maxWidth="1280px" w="full" h="60px" mx="auto" justifyContent="space-between">
        <NextChakraLink href="/" display="flex" alignItems="center" w={24} h="full" _hover={{ textDecoration: 'none' }}>
          <BrandIcon w={16} h={4} />
        </NextChakraLink>

        <Flex flexGrow={1} justifyContent="center">
          {navigation2.map(navItem => (
            <Box key={navItem} display={['none', null, 'flex']} alignItems="center" h="full">
              <NextChakraLink
                href="/"
                display="flex"
                alignItems="center"
                px={4}
                py={0}
                h="full"
                textTransform="capitalize"
                borderBottom={pathname === '/' && navItem.includes(navigation2[0]) ? `1px solid ${theme.colors.black}` : undefined}
                _hover={{ textDecoration: 'none' }}
              >
                {navItem}
              </NextChakraLink>
            </Box>
          ))}
        </Flex>

        <Flex>
          <Box alignItems="center" h="full">
            <NextChakraLink
              href="/bag"
              display="flex"
              alignItems="center"
              px={4}
              py={0}
              h="full"
              fontSize="24px"
              _hover={{ textDecoration: 'none' }}
            >
              <BagIconWithBadge isNavigation />
            </NextChakraLink>
          </Box>

          <Box alignItems="center" h="full">
            <NextChakraLink
              href="/user"
              display="flex"
              alignItems="center"
              px={4}
              py={0}
              h="full"
              fontSize="24px"
              _hover={{ textDecoration: 'none' }}
            >
              <UserIcon aria-label="user" />
            </NextChakraLink>
          </Box>

          <Box display={['flex', null, 'none']} alignItems="center" w="48px" h="full">
            <DrawerMenu />
          </Box>
        </Flex>
      </Flex>
    </header>
  )
}
