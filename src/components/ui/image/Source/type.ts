import React from 'react'
import { BREAK_POINTS } from '@/libs/const'
type SourceProps = Omit<React.ComponentPropsWithoutRef<'source'>, "srcSet" | "width" | "height"> & { srcSet: string, width: number, height: number }
export type SourceWithMediaProps = Omit<SourceProps, "media"> & { mediaSize: keyof typeof BREAK_POINTS }
export type SourceWithoutMediaProps = Omit<SourceProps, "media">
