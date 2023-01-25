export interface ITask {
  id: number;
  task: string;
  label: string[];
}

export type DynamicDates = Record<string, ITask[]>;
