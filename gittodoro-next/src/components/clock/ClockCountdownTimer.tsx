import { FC, useEffect, useState, useMemo, useCallback } from "react";

import styles from './Clock.module.css'

interface Props {
  state: string
  initialDuration: number
  running?: boolean
}

const MAX_MINUTES = 300
const MAX_SECONDS = 60

const ClockCountdownTimer: FC<Props> = ({ state, initialDuration, running = false }) => {
  const minutes = useMemo(() => Math.floor(initialDuration / MAX_SECONDS) % (MAX_MINUTES + 1), [initialDuration])
  const seconds = useMemo(() => initialDuration % MAX_SECONDS, [initialDuration])

  const [remainingSeconds, setRemainingSeconds] = useState<number>(seconds)
  const [remainingMinutes, setRemainingMinutes] = useState<number>(minutes)

  const decrementRemainingTime = useCallback(() => {
    if (remainingMinutes > 0 || remainingSeconds > 0) {
      if (remainingSeconds == 0) {
        setRemainingMinutes(remainingMinutes - 1)
        setRemainingSeconds(MAX_SECONDS - 1)
      } else {
        setRemainingSeconds(remainingSeconds - 1)
      }
    }
  }, [remainingSeconds, remainingMinutes])

  useEffect(() => {
    if (running) {
      const to = setTimeout(() => {
        decrementRemainingTime()
      }, 1000)

      return () => clearTimeout(to)
    }

  }, [running, decrementRemainingTime])

  useEffect(() => {
    setRemainingMinutes(minutes)
    setRemainingSeconds(seconds)
  }, [initialDuration, minutes, seconds])

  return (
    <>
      {remainingMinutes >= 100 &&
        <Text value={Math.floor(remainingMinutes / 100)} x={"16%"} state={state} />
      }
      <Text value={Math.floor(remainingMinutes / 10) % 10} x={"27%"} state={state} />
      <Text value={remainingMinutes % 10} x={"40%"} state={state} />
      <Text value=":" x={"50%"} y="48%" state={state} />
      <Text value={Math.floor(remainingSeconds / 10)} x={"60%"} state={state} />
      <Text value={remainingSeconds % 10} x={"73%"} state={state} />
    </>
  )
}

interface TextProps {
  value: string | number,
  state: string,
  x: string,
  y?: string
}

const Text: FC<TextProps> = (props) => {
  return (
    <text
      className={styles.clock_button_label}
      dominantBaseline="central"
      {...props}
      y={props.y || "50%"}
      fontSize=".5rem"
      textAnchor="middle"
      pointerEvents="none"
    >
      {props.value}
    </text>
  )
}

export default ClockCountdownTimer