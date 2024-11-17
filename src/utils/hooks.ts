import * as React from 'react'

export type SomeFunction<TArg> = (...args: TArg[]) => void

/**
 * @param func - The original, non debounced function (You can pass any number of args to it)
 * @param [delay] - The delay (in ms) for the function to return, default is 500ms
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
 */
export function useDebounceFn<TArg>(func: SomeFunction<TArg>, delay = 500) {
  const timer = React.useRef<number>()

  React.useEffect(() => {
    return () => {
      if (!timer.current) return
      clearTimeout(timer.current)
    }
  }, [])

  const debouncedFunction = ((...args) => {
    const timerId = setTimeout(() => func(...args), delay)
    clearTimeout(timer.current)
    timer.current = timerId as unknown as number
  }) as SomeFunction<TArg>

  return debouncedFunction
}
