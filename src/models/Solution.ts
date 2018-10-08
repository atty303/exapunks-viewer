import * as _ from 'lodash'

import {ExapunksSolution} from '@/ksy/ExapunksSolution'
import {ExaInstance} from '@/models/ExaInstance'

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

interface WinStat {
  cycles: number
  size: number
  activity: number
}

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

