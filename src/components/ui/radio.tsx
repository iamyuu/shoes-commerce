import { useRadio, useRadioGroup, Box, Flex } from '@chakra-ui/react'
import type { UseRadioProps, UseRadioGroupProps, ChakraProps } from '@chakra-ui/react'

export interface BaseRadioProps extends ChakraProps {
  bg?: string
  isRounded?: boolean
  _checked?: ChakraProps
}

export interface RadioProps extends BaseRadioProps, UseRadioProps {
  children?: React.ReactNode
}

export interface RadioButtonProps extends UseRadioGroupProps, BaseRadioProps {
  options: string[]
}

export function Radio(props: RadioProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const rounded = props.isRounded ? { borderRadius: '50%' } : {}

  return (
    <label>
      <input {...getInputProps()} />
      <Box
        {...props}
        {...getCheckboxProps()}
        cursor="pointer"
        m={2}
        width={10}
        height={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg={props.bg || 'white'}
        borderColor={props.bg || 'rgba(19, 18, 18, 0.1)'}
        _hover={{ borderColor: 'black' }}
        _checked={{
          borderColor: 'black',
          bg: 'black',
          color: 'white',
          // eslint-disable-next-line no-underscore-dangle
          ...props._checked
        }}
        {...rounded}
      >
        {props?.children}
      </Box>
    </label>
  )
}

export function RadioButton(props: RadioButtonProps) {
  const { isNative, name, onChange, value, defaultValue, ...rest } = props
  const { getRootProps, getRadioProps } = useRadioGroup({ isNative, name, onChange, value, defaultValue })

  return (
    <Flex flexWrap="wrap" {...getRootProps()}>
      {props.options.map(optionValue => (
        <Radio key={optionValue} name={name} {...rest} {...getRadioProps({ value: optionValue })}>
          {optionValue}
        </Radio>
      ))}
    </Flex>
  )
}
