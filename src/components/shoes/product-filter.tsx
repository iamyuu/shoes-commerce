import * as React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useQueryState, queryTypes } from 'next-usequerystate'
import {
  Button,
  IconButton,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  HStack,
  Input,
  NumberInputProps,
  InputGroup,
  InputLeftAddon,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  DrawerProps,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useModalContext
} from '@chakra-ui/react'
import { FilterIcon } from 'components/icons'
import { useAllBrandQuery } from 'services/shoes'

function FilterInputSearch() {
  const { t } = useTranslation('filter')
  const [name, setName] = useQueryState('q', queryTypes.string)

  return (
    <FormControl>
      <FormLabel>{t('filter.search')}</FormLabel>
      <Input placeholder={`${t('filter.search')}...`} value={name ?? ''} onChange={e => setName(e.target.value)} />
    </FormControl>
  )
}

function FilterSelectBrand() {
  const { t } = useTranslation('filter')
  const [brand, setBrand] = useQueryState('brand', queryTypes.string)
  const { data: brands, isLoading, isError } = useAllBrandQuery()

  if (isError) {
    return null
  }

  return (
    <FormControl>
      <FormLabel>{t('filter.brand')}</FormLabel>
      <Select value={brand ?? ''} isDisabled={isLoading} onChange={e => setBrand(e.target.value)}>
        {brands?.map(brand => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

const currentYear = new Date().getFullYear()
const filterRangeOptions = ['lt', 'lte', 'gt', 'gte']

function FilterSelectReleaseYear() {
  const { t } = useTranslation('filter')
  const [releaseYear, setReleaseYear] = useQueryState('releaseYear', queryTypes.string)
  const [initialFilter, year] = releaseYear?.split('_') || []
  const [filterRange, setFilterRange] = React.useState(initialFilter)

  React.useEffect(() => {
    if (year) {
      setReleaseYear(`${filterRange}_${year}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRange, year])

  return (
    <FormControl>
      <FormLabel>{t('filter.release-year')}</FormLabel>
      <HStack>
        <Select defaultValue="lte" value={filterRange ?? ''} onChange={e => setFilterRange(e.target.value)}>
          <option disabled value="">
            {t('filter-range.choose')}
          </option>
          {filterRangeOptions.map(option => (
            <option key={option} value={option}>
              {t(`filter-range.${option}`)}
            </option>
          ))}
        </Select>
        <NumberInput
          allowMouseWheel
          width="36"
          min={1900}
          max={currentYear}
          value={year}
          onChange={valueAsString => setReleaseYear(valueAsString ? `${filterRange}_${valueAsString}` : null)}
        >
          <NumberInputField placeholder={`${currentYear}`} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </FormControl>
  )
}

function InputPrice(props: NumberInputProps) {
  return (
    <InputGroup>
      <InputLeftAddon>SGD</InputLeftAddon>
      <NumberInput {...props} min={0}>
        <NumberInputField placeholder={props.placeholder} />
      </NumberInput>
    </InputGroup>
  )
}

function FilterRangePrice() {
  const { t } = useTranslation('filter')
  const [minPrice, setMinPrice] = useQueryState('min_price', queryTypes.integer)
  const [maxPrice, setMaxPrice] = useQueryState('max_price', queryTypes.integer)

  return (
    <FormControl>
      <FormLabel>{t('filter.price.title')}</FormLabel>
      <Stack>
        <InputPrice
          placeholder={t('filter.price.min')}
          value={minPrice ?? ''}
          onChange={(_valueAsString, valueAsNumber) => setMinPrice(valueAsNumber)}
        />
        <InputPrice
          placeholder={t('filter.price.max')}
          value={maxPrice ?? ''}
          onChange={(_valueAsString, valueAsNumber) => setMaxPrice(valueAsNumber)}
        />
      </Stack>
    </FormControl>
  )
}

function SortPrice() {
  const { t } = useTranslation('filter')
  const [sort, setSort] = useQueryState('sort', queryTypes.string)

  return (
    <FormControl>
      <FormLabel>{t('sort.price')}</FormLabel>
      <Select value={sort?.split('_')[1] ?? ''} onChange={e => setSort(`price_${e.target.value}`)}>
        <option disabled value="">
          {t('sort-order.choose')}
        </option>
        <option value="asc">{t('sort-order.low-to-high')}</option>
        <option value="desc">{t('sort-order.high-to-low')}</option>
      </Select>
    </FormControl>
  )
}

function FilterActions() {
  const router = useRouter()
  const { t } = useTranslation('filter')
  const { onClose } = useModalContext()

  return (
    <HStack justify="flex-end">
      <Button
        variant="outline"
        onClick={() => {
          router.replace(router.asPath.split('?')[0])
          onClose()
        }}
      >
        {t('actions.reset')}
      </Button>
      <Button onClick={onClose}>{t('actions.apply')}</Button>
    </HStack>
  )
}

function DrawerFilter(props: Pick<DrawerProps, 'isOpen' | 'onClose'>) {
  const { t } = useTranslation('filter')

  return (
    <Drawer {...props} size="sm" placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t('title')}</DrawerHeader>
        <DrawerBody>
          <Stack spacing={4}>
            <FilterInputSearch />
            <FilterSelectBrand />
            <FilterSelectReleaseYear />
            <FilterRangePrice />

            <Divider />

            <SortPrice />

            <Divider />

            <FilterActions />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export function ProductFilter() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        isRound
        size="lg"
        variant="ghost"
        bgColor="white"
        border="1px solid"
        borderColor="gray.300"
        position="fixed"
        bottom={4}
        right={4}
        zIndex={100}
        aria-label="Filter products"
        icon={<FilterIcon />}
        onClick={onOpen}
      />

      <DrawerFilter isOpen={isOpen} onClose={onClose} />
    </>
  )
}
