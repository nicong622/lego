export interface ConfigProps<T extends object> {
  value: T
  onChange: (params: T) => void
}