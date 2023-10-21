import { useEffect } from 'react'

export default function useSEO (title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('[name=description]')?.setAttribute('content', description)
  }, [title, description])
}
