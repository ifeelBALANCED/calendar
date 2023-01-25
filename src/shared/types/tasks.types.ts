export interface ITask {
  id: string;
  task: string;
  label: string[];
}

export type DynamicDates = Record<string, ITask[]>;
