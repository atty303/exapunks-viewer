import * as _ from 'lodash'
import { KaitaiStream } from 'kaitai-struct'

import { ExapunksSolution } from '@/ksy/ExapunksSolution'


export class SolutionFile {
  public fileName!: string
  public solution?: Solution
  public error?: Error
  public get name(): string {
    return this.fileName.replace(/\.solution$/i, '')
  }

  constructor(fileName: string, bytes: ArrayBuffer) {
    this.fileName = fileName
    try {
      this.solution = new Solution(new ExapunksSolution(new KaitaiStream(bytes)))
    } catch (e) {
      this.error = e
    }
  }
}

const mdTemplate = _.template(`
# <%= fileId %>: <%= name %>
<% if (winStat) { %>
> **CYCLES**  : <%= winStat.cycles %>
> **SIZE**    : <%= winStat.size %>
> **ACTIVITY**: <%= winStat.activity %>
<% } else { %>
> **UNVERIFIED**
<% } %>
<% _.each(exaInstances, function(exa) { %>
## <%= exa.name %> (<%= exa.memoryScope %>)

\`\`\`
<%= exa.code %>
\`\`\`
<% }) %>
`)

export class Solution {
  public get fileId(): string {
    return this.struct.fileId.string
  }
  public get name(): string {
    return this.struct.name.string
  }
  public get winStat(): WinStat | undefined {
    if (this.struct.winStatsCount === 3) {
      return {
        cycles: this.struct.winStats[ExapunksSolution.WinValueType.CYCLES].value,
        size: this.struct.winStats[ExapunksSolution.WinValueType.SIZE].value,
        activity: this.struct.winStats[ExapunksSolution.WinValueType.ACTIVITY].value,
      }
    }
  }
  public get competitionWins(): number {
    return this.struct.competitionWins
  }
  public get redshiftProgramSize(): number {
    return this.struct.redshiftProgramSize
  }
  public get codeMarkdown(): string {
    return mdTemplate({
      fileId: this.fileId,
      name: this.name,
      winStat: this.winStat,
      exaInstances: this.exaInstances
    })
  }

  public readonly exaInstances!: ExaInstance[]

  private struct!: any

  constructor(struct: any) {
    this.struct = struct
    this.exaInstances = struct.exaInstances.map((s: any) => new ExaInstance(s))
  }
}

interface WinStat {
  cycles: number
  size: number
  activity: number
}

type MemoryScope = 'GLOBAL' | 'LOCAL'
type EditorDisplayStatus = 'UNROLLED' | 'COLLAPSED'

class ExaInstance {
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
