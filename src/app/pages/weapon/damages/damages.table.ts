import { Action } from "src/app/mms-common/organisms/table/table.component";
import { TableState } from "src/app/store/models/table.state";

const baseApiUrl = 'http://localhost:3000';
const dataSourceUrl = `${baseApiUrl}/damages`;
const actions: Array<Action> = [
  { name: 'Expand', type: 'expand', path: 'damages' },
  { name: 'Edit', type: 'edit' },
];

const damagesTableState: TableState = {
  id: 'damages table',
  pageNumber: 0,
  pageSize: 5,
  totalItems: 0,
  data: [],
  excludedColumns: ['id'],
  links: {
    getPath: dataSourceUrl,
    createPath: `${dataSourceUrl}`,
    updatePath: `${dataSourceUrl}/[id]`,
    deletePath: `${dataSourceUrl}/[id]`,
  },
  actions,
  relations: [
    {
      type: 'damageItems',
      links: {
        getPath: `${baseApiUrl}/notifyItems?notifiesId=[id]`,
        createPath: `${baseApiUrl}/notifyItems`,
        updatePath: `${baseApiUrl}/notifyItems/[id]`,
        deletePath: `${baseApiUrl}/notifyItems/[id]`,
      },
      relationType: 'many',
    },
  ],
};
export default damagesTableState