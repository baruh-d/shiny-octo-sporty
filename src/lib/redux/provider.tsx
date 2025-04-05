"use client"

import type React from "react"
import { Provider } from "react-redux"
import store from "@/lib/redux/store"

type Props = {
  children: React.ReactNode
}

const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider