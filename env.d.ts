declare namespace NodeJS {
  interface ProcessEnv {
    STRIPE_SECRET_KEY: string
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string

    [key: string]: string
  }
}
