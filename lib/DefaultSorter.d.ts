import { OnDestroy, OnInit } from '@angular/core';
import { DataTable } from './DataTable';
export declare class DefaultSorter implements OnInit, OnDestroy {
    private mfTable;
    sortBy: string;
    isSortedByMeAsc: boolean;
    isSortedByMeDesc: boolean;
    private subs;
    constructor(mfTable: DataTable);
    ngOnInit(): void;
    ngOnDestroy(): void;
    sort(): void;
}
