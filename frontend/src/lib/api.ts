import axios from 'axios';
import { Task, CreateTaskDto, UpdateTaskDto } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  // タスク一覧を取得
  async getTasks(): Promise<Task[]> {
    const { data } = await api.get<Task[]>('/tasks');
    return data;
  },

  // タスクを取得
  async getTask(id: string): Promise<Task> {
    const { data } = await api.get<Task>(`/tasks/${id}`);
    return data;
  },

  // タスクを作成
  async createTask(task: CreateTaskDto): Promise<Task> {
    const { data } = await api.post<Task>('/tasks', task);
    return data;
  },

  // タスクを更新
  async updateTask(id: string, task: UpdateTaskDto): Promise<Task> {
    const { data } = await api.patch<Task>(`/tasks/${id}`, task);
    return data;
  },

  // タスクを削除
  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};

export default api;
