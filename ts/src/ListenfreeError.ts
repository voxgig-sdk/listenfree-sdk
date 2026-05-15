
import { Context } from './Context'


class ListenfreeError extends Error {

  isListenfreeError = true

  sdk = 'Listenfree'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ListenfreeError
}

