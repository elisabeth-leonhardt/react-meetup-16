export interface CompleteTodoI {
    user: string;
    task: string;
    done: boolean;
    id: string;
  }
  
export interface UserCreatedTodoI {
    user?: string;
    task?: string;
  }
  