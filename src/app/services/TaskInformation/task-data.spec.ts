import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TaskDataService } from './task-data';
import { vi } from 'vitest';
import { Task } from '../../model/Task';

describe('TaskData', () => {
  let service: TaskDataService;
  let store: { [key: string]: string };

  beforeEach(() => {
    store = {};

    // Create a clean mock object that mirrors the Storage interface
    const mockLocalStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => store[key] = value,
      removeItem: (key: string) => delete store[key],
      clear: () => store = {},
      key: (index: number) => '',
      length: 0
    };

    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage, writable: true });
    vi.spyOn(window.localStorage, 'getItem');

    TestBed.configureTestingModule({
      providers: [
        TaskDataService,
        // Force the service to pass the 'isPlatformBrowser' check
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
  });

it('should be created and initialize with an empty map if storage is blank', () => {
    service = TestBed.inject(TaskDataService);
    expect(service).toBeTruthy();
    expect(service.tasks()).toEqual(new Map<number, Task>());
  });

  it('should load initial tasks from localStorage if they exist', () => {
    const localStorageMock = { "1": { "description": "something", "id": 1, "title": "TestTask" } };
    store['my_tasks_app'] = JSON.stringify(localStorageMock);

    service = TestBed.inject(TaskDataService);

    const expectedMap = new Map<number, any>([
      [1, { description: 'something', id: 1, title: 'TestTask' }]
    ]);

    expect(service.tasks()).toEqual(expectedMap);
  });
});


