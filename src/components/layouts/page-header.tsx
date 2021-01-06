import { Box, Heading } from '@chakra-ui/react'

export interface PageHeaderProps {
  children: React.ReactNode
}

export default function PageHeader({ children }: PageHeaderProps) {
  return (
    <Box as="header" position="relative" mx="auto" d="flex" justifyContent="center" alignItems="center" height="200px" maxWidth="3xl">
      <Heading as="h1" fontSize="5xl" fontWeight={600} textTransform="capitalize">
        {children}
      </Heading>
    </Box>
  )
}
