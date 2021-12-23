import { State, useHookstate } from "@hookstate/core";
import React from "react";

const WrapState: React.FC<{state:State<object>}> = (props) => {
  const localState = useHookstate(props.state)
  const childCopy = React.cloneElement(props.children as JSX.Element, localState.get())

  return (
    <>{ childCopy }</>
  )
}

export default WrapState