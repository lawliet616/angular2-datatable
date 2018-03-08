import { OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { DataTable } from './DataTable';
export declare class Paginator implements OnChanges, OnDestroy {
    private injectMfTable;
    inputMfTable: DataTable;
    private mfTable;
    activePage: number;
    rowsOnPage: number;
    dataLength: number;
    lastPage: number;
    private subs;
    constructor(injectMfTable: DataTable);
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): any;
    ngOnDestroy(): void;
    setPage(pageNumber: number): void;
    setRowsOnPage(rowsOnPage: number): void;
    private onPageChangeSubscriber;
}
