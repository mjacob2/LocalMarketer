import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientsTableComponent } from './clients-table.component';
import { MaterialTestingModule } from 'src/app/material-testing.module';

describe('Component: Clients-table', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsTableComponent],
      imports: [RouterTestingModule, MaterialTestingModule],
      providers: [/* Add any necessary providers here */],
    }).compileComponents();
  });
    
    it(`pageSize should be initialized to 20`, () => {
        const fixture = TestBed.createComponent(ClientsTableComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.pageSize).toEqual(20);
      });

      it(`doSomething() returns value`, () => {
        const fixture = TestBed.createComponent(ClientsTableComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.doSomething(2)).toEqual(4);
      });

    });
