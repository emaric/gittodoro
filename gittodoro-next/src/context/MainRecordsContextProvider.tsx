import { createContext, ReactNode, useState, useContext, useEffect } from "react";

import * as DateTime from '@/modules/temporal/DateTime'
import { generateRecords, Record } from "@/models/Record";

import { useMainSessions } from "./MainSessionsContextProvider";


type MainRecordsContextType = {
  mainRecords: Record[]
}

const MainRecordsContext = createContext<MainRecordsContextType>({ mainRecords: [] })

export const MainRecordsProvider = (props: { children: ReactNode }) => {
  const { mainSessions } = useMainSessions()

  const [mainRecords, setMainRecords] = useState<Record[]>([])

  useEffect(() => {
    // update main records
    console.log('update main records...')
    let records: Record[] = []
    mainSessions.forEach((session) => {
      if (session.endPlainDateTime) {
        const end = session.endPlainDateTime
        records = [...records, ...generateRecords(session, end)]
      }
    })

    setMainRecords(records)

  }, [mainSessions])

  useEffect(() => {
    console.log('main records...', mainRecords)
  }, [mainRecords])

  return (
    <MainRecordsContext.Provider value={{ mainRecords }}>
      {props.children}
    </MainRecordsContext.Provider>
  )
}

export const useMainRecords = () => {
  const context = useContext(MainRecordsContext)

  if (!context) {
    throw new Error("useMainRecords must be used inside a `MainRecordsProvider`")
  }

  return context
}