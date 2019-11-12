import {ColumnSet} from 'pg-promise';

export type TCColumnSets = {
    insert?: ColumnSet,
    update?: ColumnSet
};
