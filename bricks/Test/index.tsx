export interface TestProps {
  color: string
  text: string
}

export default function Test(props: TestProps) {
  return (
    <div style={{ color: props.color }} className="border border-dashed rounded text-center p-1 m-1">{props.text}</div>
  )
}