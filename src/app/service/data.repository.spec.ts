import { HttpClient } from '@angular/common/http';
import * as mockito from 'ts-mockito';

import * as model from '../model/model';
import { DataRepository } from '../service/data.repository';

describe('DataRepository', () => {

  let httpMock: HttpClient;
  let dataRepositoryToTest: DataRepository;

  beforeAll(() => {
    // Creation des mocks
    httpMock = mockito.mock(HttpClient);
  });

  beforeEach(() => {
    // Creation du Repository
    dataRepositoryToTest = new DataRepository(this.httpMock);
  });
});
