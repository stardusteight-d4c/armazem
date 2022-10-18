import React, { useEffect, useState } from 'react'
import { handleSwitchTheme } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'

interface Props {}

export const SwitchTheme = (props: Props) => {
  const dispatch = useAppDispatch()

  return <div onClick={() => dispatch(handleSwitchTheme())}>SwitchTheme</div>
}
