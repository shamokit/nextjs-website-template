import type { AspidaMethods, DefineMethods as DefineMethodsOriginal } from 'aspida'

export type DefineMethods<T extends AspidaMethods> = DefineMethodsOriginal<T>
