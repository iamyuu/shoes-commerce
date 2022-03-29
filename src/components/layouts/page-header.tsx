import { Box, Heading, useTheme } from '@chakra-ui/react'

export interface PageHeaderProps {
  children: React.ReactNode
}

export default function PageHeader({ children }: PageHeaderProps) {
  const theme = useTheme()

  return (
    <Box as="header" position="relative" mx="auto" d="flex" justifyContent="center" alignItems="center" height={48} maxWidth="3xl">
      <Heading as="h1" fontSize="5xl" fontWeight={700} textTransform="capitalize" color={theme.colors.brand.black}>
        {children}
      </Heading>
    </Box>
  )
}
