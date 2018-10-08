import {KaitaiStream} from 'kaitai-struct'

import {ExapunksSolution} from '@/ksy/ExapunksSolution'
import {Solution} from '@/models/Solution'

export class SolutionFile {
  public readonly fileName: string
  public readonly solution: Solution
  public readonly name: string
  public readonly index: number

  public get markdownFilename(): string {
    return this.fileName.replace(/\.solution$/i, '.md')
  }
  public get codeMarkdown(): string {
    return this.solution.codeMarkdown
  }

  constructor(fileName: string, bytes: ArrayBuffer) {
    this.fileName = fileName
    try {
      this.solution = new Solution(new ExapunksSolution(new KaitaiStream(bytes)))
    } catch (e) {
      throw new Error(`Invalid file "${fileName}": ${e}`)
    }

    const m = this.fileName.match(/^(.+)-(\d+)\.solution$/i)
    if (!m) {
      throw new Error(`Invalid file name: "${this.fileName}"`)
    }
    this.name = m[1]
    this.index = parseInt(m[2], 10)
  }
}
