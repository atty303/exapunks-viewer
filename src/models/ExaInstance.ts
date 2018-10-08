import {ExapunksSolution} from '@/ksy/ExapunksSolution'

type MemoryScope = 'GLOBAL' | 'LOCAL'
type EditorDisplayStatus = 'UNROLLED' | 'COLLAPSED'

export class ExaInstance {
  public get name(): string {
    return this.struct.name.string
  }

  public get code(): string {
    return this.struct.code.string
  }

  public get memoryScope(): MemoryScope {
    return ExapunksSolution.MemoryScope[this.struct.memoryScope]
  }

  public get editorDisplayStatus(): EditorDisplayStatus {
    return ExapunksSolution.EditorDisplayStatus[this.struct.editorDisplayStatus]
  }

  private struct!: any

  constructor(struct: any) {
    this.struct = struct
  }
}
