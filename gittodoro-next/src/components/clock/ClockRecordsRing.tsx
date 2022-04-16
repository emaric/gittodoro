import { useCallback, useEffect, useState } from "react"

import * as DateTime from "@/modules/temporal/DateTime"
import { Clock } from "@/models/Clock"
import { Record } from "@/models/Record"

import ClockRing from "./ClockRing"


interface Props {
  clock: Clock
  records: Record[]
}

const ClockRecordsRing = ({ clock, records }: Props) => {
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([])

  const filterRecords = useCallback(() => {
    console.log('ClockRecordsRing...', records.length)
    const filtered = records
      .filter((record) => DateTime.difference(record.end, clock.start) > 0)
      .filter((record) => DateTime.difference(clock.end, record.start) > 0)
    setFilteredRecords(filtered)
  }, [clock, records])

  useEffect(() => {
    filterRecords()
  }, [filterRecords])

  return (
    <>
      {filteredRecords.map((record, i) => (
        <ClockRing key={i}
          state={record.state}
          start={
            DateTime.difference(clock.start, record.start) > 0
              ? clock.start
              : record.start
          }
          end={
            DateTime.difference(record.end, DateTime.now()) > 0
              ? DateTime.now()
              : record.end
          }
          clock={clock} />
      ))}
    </>
  )
}

export default ClockRecordsRing