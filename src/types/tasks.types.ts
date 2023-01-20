export interface ITask {
  id: number;
  task: string;
}

export type DynamicDates = Record<string, ITask[]>;
