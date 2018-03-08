import {Component, Input, OnChanges, OnDestroy, Optional, SimpleChange} from '@angular/core';
import {DataTable, PageEvent} from './DataTable';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'mfPaginator',
    template: `
        <ng-content></ng-content>`
})
export class Paginator implements OnChanges, OnDestroy {
    @Input('mfTable') inputMfTable: DataTable;

    private mfTable: DataTable;

    public activePage: number;
    public rowsOnPage: number;
    public dataLength: number = 0;
    public lastPage: number;

    private subs: Subscription[] = [];

    constructor(@Optional() private injectMfTable: DataTable) {
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }): any {
        this.mfTable = this.inputMfTable || this.injectMfTable;
        this.onPageChangeSubscriber(this.mfTable.getPage());
        const sub = this.mfTable.onPageChange.subscribe(this.onPageChangeSubscriber);
        this.subs.push(sub);
    }

    ngOnDestroy(): void {
        this.subs.forEach(s => s.unsubscribe());
    }

    public setPage(pageNumber: number): void {
        this.mfTable.setPage(pageNumber, this.rowsOnPage);
    }

    public setRowsOnPage(rowsOnPage: number): void {
        this.mfTable.setPage(this.activePage, rowsOnPage);
    }

    private onPageChangeSubscriber = (event: PageEvent) => {
        this.activePage = event.activePage;
        this.rowsOnPage = event.rowsOnPage;
        this.dataLength = event.dataLength;
        this.lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
    };
}