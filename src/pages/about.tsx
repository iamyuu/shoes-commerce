import { Box, Stack, Heading, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { PageHeader } from 'components/layouts'

export default function AboutPage() {
  return (
    <Box pb={12}>
      <PageHeader>About Us</PageHeader>

      {/* Generated from https://www.boom-online.co.uk/lorem-ipsum */}
      <Stack>
        <Text>
          Until the 19th century, shoemaking was a traditional handicraft, but by the century's end, the process had been almost completely
          mechanized, with production occurring in large factories. Despite the obvious economic gains of mass production, the factory
          system produced shoes without the individual differentiation that the traditional shoemaker was able to provide.
        </Text>

        <Text>
          In the 19th century Chinese feminists called for an end to foot binding, and a ban in 1902 was implemented. The ban was soon
          repealed, but it was banned again in 1911 by the new Nationalist government. It was effective in coastal cities, but countryside
          cities continued without much regulation. Mao Zedong enforced the rule in 1949 and the practice is still forbidden. A number of
          women still have bound feet today.
        </Text>

        <Text>
          However, when the war ended in 1815, manual labour became much cheaper, and the demand for military equipment subsided. As a
          consequence, Brunel's system was no longer profitable and it soon ceased business.
        </Text>

        <Text>
          Similar exigencies at the time of the Crimean War stimulated a renewed interest in methods of mechanization and mass-production,
          which proved longer lasting.
        </Text>

        <Text>
          In 2007, the global shoe industry had an overall market of $107.4 billion, in terms of revenue, and is expected to grow to $122.9
          billion by the end of 2012. Shoe manufacturers in the People's Republic of China account for 63% of production, 40.5% of global
          exports and 55% of industry revenue. However, many manufacturers in Europe dominate the higher-priced, higher value-added end of
          the market.
        </Text>
      </Stack>

      <Heading as="h2" fontSize="3xl" fontWeight={700} textAlign="center" mt={12} mb={4}>
        FAQ
      </Heading>

      <Stack spacing={4}>
        <Text>A frequently asked questions list</Text>

        <Accordion defaultIndex={[0]} allowMultiple>
          {Array.from({ length: 10 }).map((_, index) => (
            <AccordionItem key={index}>
              <h3>
                <AccordionButton>
                  <Text flex="1" textAlign="left">
                    Question {index + 1}
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Box>
  )
}
