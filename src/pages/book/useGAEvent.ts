declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>
  }
}

export const useGAEvent = () => {
  return (eventName: string, params?: Record<string, any>) => {
    window.dataLayer?.push({ event: eventName, ...params })
  }
}
