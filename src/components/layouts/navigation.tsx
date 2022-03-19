import * as React from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Flex, Box, Menu, MenuButton, MenuList, MenuItem, useTheme, useMediaQuery } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { BrandIcon } from 'components/icons'
import { NextChakraLink } from 'components/helpers'
import { BagIconWithBadge } from 'components/bag'
import i18nConfig from '../../../i18n'

const { locales } = i18nConfig

const navigation = [
  {
    label: 'navigation.about',
    href: '/about'
  },
  {
    label: 'navigation.faq',
    href: '/about#faq'
  }
]

function ChangeLanguage() {
  const theme = useTheme()
  const router = useRouter()
  const { t, lang } = useTranslation()
  const [isMobile] = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`)
  const currentLang = isMobile ? lang.toUpperCase() : t(`layout:language-name.${lang}`)

  return (
    <Menu>
      {({ isOpen: menuIsOpen }) => (
        <>
          <MenuButton>
            {currentLang} {menuIsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </MenuButton>
          <MenuList>
            {locales?.map(lng => (
              <MenuItem key={lng} onClick={() => router.replace(router.asPath, router.asPath, { locale: lng })}>
                {t(`layout:language-name.${lng}`)}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  )
}

function Navigation() {
  const { t } = useTranslation()

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
          _hover={{ textDecoration: 'none' }}
        >
          {t(`layout:${navItem.label}`)}
        </NextChakraLink>
      ))}
    </Flex>
  )
}

export default function TopNavigation() {
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
            <ChangeLanguage />
          </Flex>

          <Navigation />
        </Flex>
      </Box>

      <Flex as="nav" maxWidth="1280px" w="full" h="60px" mx="auto" justifyContent="space-between">
        <NextChakraLink href="/" display="flex" alignItems="center" w={24} h="full" _hover={{ textDecoration: 'none' }}>
          <BrandIcon w={16} h={4} />
        </NextChakraLink>

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
        </Flex>
      </Flex>
    </header>
  )
}
