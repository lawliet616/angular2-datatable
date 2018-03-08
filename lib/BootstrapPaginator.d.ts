import { EventEmitter, OnChanges } from '@angular/core';
import { DataTable } from './DataTable';
export declare class BootstrapPaginator implements OnChanges {
    rowsOnPageSet: any[];
    mfTable: DataTable;
    pageSizeChanged: EventEmitter<number>;
    minRowsOnPage: number;
    ngOnChanges(changes: any): any;
    setPageSize(p: any, size: number): void;
}
