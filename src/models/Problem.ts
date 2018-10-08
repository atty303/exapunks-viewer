import { SolutionFile } from '@/models/SolutionFile'

export class Problem {
  public readonly fileId: string

  public get name(): string {
    return this.solutionFiles[0].name
  }

  public readonly solutionFiles: SolutionFile[]

  public hasSolutionFile(solutionFile: SolutionFile): boolean {
    return this.solutionFiles.findIndex((v) => v.fileName === solutionFile.fileName) >= 0
  }

  public add(solutionFile: SolutionFile) {
    if (!this.hasSolutionFile(solutionFile)) {
      this.solutionFiles.push(solutionFile)
    }
  }

  constructor(fileId: string, solutionFiles: SolutionFile[]) {
    this.fileId = fileId
    this.solutionFiles = solutionFiles
  }
}
