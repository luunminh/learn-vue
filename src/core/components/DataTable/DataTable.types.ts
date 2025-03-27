/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef, RowData, TableOptions } from '@tanstack/vue-table'

export interface DataTableProps<TData extends RowData>
  extends /* @vue-ignore */ Omit<TableOptions<TData>, 'getCoreRowModel'> {
  data: TData[]
  columns: ColumnDef<TData>[]
  isLoading?: boolean
  totalRecords: number
  onAction: (params: any) => void
  additionalFilterParams?: string[]
}
