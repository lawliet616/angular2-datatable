import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataTable, SortEvent} from './DataTable';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'mfDefaultSorter',
    template: `
        <a style="cursor: pointer"
           (click)="sort()"
           class="text-nowrap">
            <ng-content></ng-content>
            <span *ngIf="isSortedByMeAsc"
                  class="glyphicon glyphicon-triangle-top"
                  aria-hidden="true"></span>
            <span *ngIf="isSortedByMeDesc"
                  class="glyphicon glyphicon-triangle-bottom"
                  aria-hidden="true"></span>
        </a>`
})
export class DefaultSorter implements OnInit, OnDestroy {
    @Input('by') sortBy: string;

    isSortedByMeAsc: boolean = false;
    isSortedByMeDesc: boolean = false;

    private subs: Subscription[] = [];

    constructor(private mfTable: DataTable) {
    }

    ngOnInit(): void {
        const sub = this.mfTable.onSortChange.subscribe((event: SortEvent) => {
            this.isSortedByMeAsc = (event.sortBy == this.sortBy && event.sortOrder == 'asc');
            this.isSortedByMeDesc = (event.sortBy == this.sortBy && event.sortOrder == 'desc');
        });
        this.subs.push(sub);
    }

    ngOnDestroy(): void {
        this.subs.forEach(s => s.unsubscribe());
    }

    sort() {
        if (this.isSortedByMeAsc) {
            this.mfTable.setSort(this.sortBy, 'desc');
        } else {
            this.mfTable.setSort(this.sortBy, 'asc');
        }
    }
}