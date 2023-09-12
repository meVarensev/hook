import React, {useState, useCallback} from 'react'

type UseArrayActions<T> = {
  push: (item: T) => void,
  removeByIndex: (index: number) => void,
  removeById: (id: string) => void;
}

export function useArray<T>(initialValue: T[]): { value: T[] } & UseArrayActions<T> {
  const [value, setValue] = useState(initialValue)

  const push = useCallback((item) => setValue(prev => [...prev, item])
    , [])

  const removeByIndex = useCallback((index) =>
    setValue(prev => prev.filter((_, i) => i !== index))
    , [])

  const removeById = useCallback((id: string) => {
    setValue(prev => prev.filter(item => item.id !== id));
  }, []);

  return {value, push, removeByIndex , removeById}
}
