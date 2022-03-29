import * as React from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import {
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useTheme,
  useMediaQuery,
  useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { BrandIcon } from 'components/icons'
import { NextChakraLink } from 'components/helpers'
import { BagIconWithBadge } from 'components/bag'
import { navigation, navigationCategory } from 'constants/navigation'
import i18nConfig from '../../../i18n'

const { locales } = i18nConfig

function useActiveLink() {
  const router = useRouter()

  function getActiveLink(link: string) {
    return router.asPath === link
  }

  return { getActiveLink }
}

function ChangeLanguage() {
  const theme = useTheme()
  const router = useRouter()
  const { t, lang } = useTranslation('layout')
  const [isMobile] = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`)
  const currentLang = isMobile ? lang.toUpperCase() : t(`language-name.${lang}`)

  function handleChangeLang(lang: string | string[]) {
    const newLocale = Array.isArray(lang) ? lang[0] : lang
    router.replace(router.asPath, router.asPath, { locale: newLocale })
  }

  return (
    <Menu>
      {({ isOpen: menuIsOpen }) => (
        <>
          <MenuButton px={4} py={2} _hover={{ bg: 'blackAlpha.200' }} _expanded={{ bg: 'blackAlpha.200' }}>
            {currentLang} {menuIsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup type="radio" value={lang} onChange={handleChangeLang}>
              {locales?.map(lng => (
                <MenuItemOption key={lng} value={lng}>
                  {t(`language-name.${lng}`)}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  )
}

function TopNavigation() {
  const { t } = useTranslation('layout')

  return (
    <Flex as="nav" h="full">
      {navigation.map(navItem => (
        <NextChakraLink
          key={navItem.href}
          href={navItem.href}
          display="flex"
          alignItems="center"
          px={4}
          py={0}
          h="full"
          _hover={{ bg: 'blackAlpha.200' }}
        >
          {t(navItem.label)}
        </NextChakraLink>
      ))}
    </Flex>
  )
}

function NavigationCategory() {
  const theme = useTheme()
  const { t } = useTranslation('layout')
  const { getActiveLink } = useActiveLink()

  return (
    <Flex flexGrow={1} justifyContent="center">
      {navigationCategory.map(navItem => (
        <Box key={navItem.href} display={['none', null, 'flex']} alignItems="center" h="full">
          <NextChakraLink
            href={navItem.href}
            display="flex"
            alignItems="center"
            px={4}
            py={0}
            h="full"
            textTransform="capitalize"
            borderBottom={getActiveLink(navItem.href) ? `1px solid ${theme.colors.black}` : undefined}
            _hover={{ bg: 'blackAlpha.200' }}
          >
            {t(navItem.label)}
          </NextChakraLink>
        </Box>
      ))}
    </Flex>
  )
}

function DrawerMenu() {
  const { t } = useTranslation('layout')
  const { getActiveLink } = useActiveLink()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      display={['flex', null, 'none']}
      alignItems="center"
      w={12}
      h="full"
      cursor="pointer"
      _hover={{ bg: 'blackAlpha.200' }}
      onClick={onOpen}
    >
      <HamburgerIcon px={4} w="full" aria-label="Open menu" />

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>&nbsp;</DrawerHeader>
          <DrawerBody p="0">
            {navigationCategory.map(navItem => (
              <NextChakraLink
                key={navItem.href}
                href={navItem.href}
                display="flex"
                alignItems="center"
                px={6}
                py={4}
                textTransform="capitalize"
                bg={getActiveLink(navItem.href) ? 'blackAlpha.100' : 'transparent'}
                _hover={{ bg: 'blackAlpha.200' }}
              >
                {t(navItem.label)}
              </NextChakraLink>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default function Header() {
  return (
    <header>
      <Box bg="brand.gray">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxWidth="var(--max-w-container)"
          w="full"
          h={9}
          mx="auto"
          fontSize="0.75rem"
          fontWeight="400"
        >
          <Flex alignItems="center" w={[null, null, '15%', '20%']} h="full">
            <ChangeLanguage />
          </Flex>

          <TopNavigation />
        </Flex>
      </Box>

      <Flex as="nav" maxWidth="var(--max-w-container)" w="full" h={14} mx="auto" justifyContent="space-between">
        <Flex alignItems="center" w={24} h="full">
          <BrandIcon w={16} h={4} />
        </Flex>

        <NavigationCategory />

        <Flex>
          <Box alignItems="center" h="full">
            <NextChakraLink
              href="/bag"
              display="flex"
              alignItems="center"
              px={4}
              py={0}
              h="full"
              fontSize="1.5rem"
              _hover={{ bg: 'blackAlpha.200' }}
            >
              <BagIconWithBadge isNavigation />
            </NextChakraLink>
          </Box>

          <DrawerMenu />
        </Flex>
      </Flex>
    </header>
  )
}
