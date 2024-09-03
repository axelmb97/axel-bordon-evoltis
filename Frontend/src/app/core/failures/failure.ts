export abstract class Failure {
  constructor(
    public message:string,
    public code: number
  ) {}
}

