declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string

    SNEAKER_API_URL: string
    SNEAKER_API_HOST: string
    SNEAKER_API_KEY: string

    STRIPE_SECRET_KEY: string
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string

    [key: string]: string
  }
}
