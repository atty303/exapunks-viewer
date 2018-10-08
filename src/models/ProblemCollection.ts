import JSZip from 'jszip'
import {Problem, SolutionFile} from '@/models'

export class ProblemCollection {
  public readonly problems: Problem[] = []

  public get isEmpty(): boolean {
    return this.problems.length === 0
  }

  public addSolutionFile(solutionFile: SolutionFile): boolean {
    if (this.findBySolutionFile(solutionFile)) {
      return false
    } else {
      let problem = this.findByFileId(solutionFile.solution.fileId)
      if (!problem) {
        problem = new Problem(solutionFile.solution.fileId, [solutionFile])
        this.problems.push(problem)
      }
      problem.add(solutionFile)
      return true
    }
  }

  public findByFileId(fileId: string): Problem | undefined {
    return this.problems.find((_) => _.fileId === fileId)
  }

  public findBySolutionFile(solutionFile: SolutionFile): Problem | undefined {
    return this.problems.find((_) => _.hasSolutionFile(solutionFile))
  }

  public generateMarkdownZip(): Promise<Blob> {
    const zip = new JSZip()
    this.problems.forEach((problem) => {
      problem.solutionFiles.forEach((solutionFile) => {
        zip.file(solutionFile.markdownFilename, solutionFile.codeMarkdown)
      })
    })
    return zip.generateAsync({type : 'uint8array'})
  }
}
