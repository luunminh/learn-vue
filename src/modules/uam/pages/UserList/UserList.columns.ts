import type { ColumnDef } from '@tanstack/vue-table'
import type { GetUsersResponse } from '../../api/getUsers'
import { formatValue, getTitleCase } from '@/libs/utils'
import { UserStatus } from '../../model/user.model'
import { h } from 'vue'
import { OnyxTag } from 'sit-onyx'

export enum UserListParamsKey {
  NAME = 'fullName',
  EMAIL = 'email',
  PHONE = 'phoneNumber',
  EMPLOYEE_NO = 'employeeNo',
  ROLES = 'roles',
  STATUS = 'status',
  ACTION = 'action',
  CREATED_AT = 'createdAt',
}

export const allColumns = (): ColumnDef<GetUsersResponse>[] => [
  {
    accessorKey: UserListParamsKey.NAME,
    header: 'User Name',
    enableSorting: false,
    cell: ({ cell }) => formatValue('text', cell.getValue<string>().trim()),
  },
  {
    accessorKey: UserListParamsKey.EMAIL,
    header: 'Email',
    enableSorting: false,
    cell: ({ cell }) => formatValue('text', cell.getValue<string>()),
  },
  {
    accessorKey: UserListParamsKey.PHONE,
    header: 'Phone Number',
    enableSorting: false,
    cell: ({ cell }) => formatValue('phone', cell.getValue<string>()),
  },
  {
    accessorKey: UserListParamsKey.EMPLOYEE_NO,
    header: 'Window User Number',
    enableSorting: false,
    cell: ({ cell }) => formatValue('text', cell.getValue<string>()),
  },
  {
    accessorKey: UserListParamsKey.ROLES,
    header: 'Role',
    enableSorting: false,

    cell: ({ cell }) =>
      formatValue(
        'text',
        cell
          .getValue<GetUsersResponse['roles']>()
          .map((r) => r.displayName)
          .join(', '),
      ),
  },
  {
    accessorKey: UserListParamsKey.STATUS,
    header: 'Status',
    enableSorting: false,
    cell: ({ cell }) => {
      const status = cell.getValue<UserStatus>()

      return h(OnyxTag, {
        label: getTitleCase(status),
        color: status === UserStatus.ACTIVE ? 'primary' : 'danger',
      })
    },
  },
]
