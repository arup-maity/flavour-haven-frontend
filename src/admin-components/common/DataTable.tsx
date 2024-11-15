'use client'
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

type NestedValue = string | number | boolean | null | undefined;
export interface NestedObjectType {
   id: number; // Ensure each object has an id
   [key: string]: NestedValue | NestedObjectType;
}
type DataType = NestedObjectType[];
export type ColumnType = {
   id: string
   name: string
   header: JSX.Element | string
   sortable?: boolean
   className?: string
   render: (row: NestedObjectType) => JSX.Element | string;
}

interface PropsType {
   columns: ColumnType[];
   data: DataType
   sort?: (options: { column: string; sortOrder: string }) => void;
   loading?: boolean;
   deleteRows?: (rowId: number[]) => void;
   columnVisibility?: { [key: string]: boolean };
}

const DataTable: React.FC<PropsType> = ({ columns = [], data = [], sort, loading = false, deleteRows, columnVisibility = {} }) => {
   const [sortOrder, setSortOrder] = useState<{ [key: string]: string }>({})
   const [selectAll, setSelectAll] = useState(false);
   const [selectedRow, setSelectedRow] = useState<number[]>([]);

   useEffect(() => {
      // Update selectAll state efficiently:
      if (selectedRow.length > 0) {
         const allOnPageChecked = data.every((row: NestedObjectType) => selectedRow.includes(row?.id));
         setSelectAll(allOnPageChecked);
      }
   }, [data, selectedRow])

   useEffect(() => {
      deleteRows?.([])
      setSelectedRow([])
   }, [data])

   const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      const newProducts = checked ? data?.map((product) => product.id) : [];
      setSelectAll(checked);
      setSelectedRow(newProducts);
      deleteRows?.(newProducts);
   };

   const handleProductCheck = (productId: number, event: React.ChangeEvent<HTMLInputElement>) => {
      // 1. Update products state immutably:
      setSelectedRow((prevProducts) => {
         const newProducts = event.target.checked
            ? [...prevProducts, productId] // Add if checked
            : prevProducts.filter((id) => id !== productId); // Remove if unchecked
         return newProducts;
      })
      // 
      const newProducts = event.target.checked
         ? [...selectedRow, productId] // Add if checked
         : selectedRow.filter((id) => id !== productId);
      deleteRows?.(newProducts)
   };

   const sortData = (columnName: string) => {
      const order = sortOrder[columnName] === 'desc' ? 'asc' : 'desc';
      setSortOrder({ [columnName]: order });
      sort?.({ column: columnName, sortOrder: order });
   };

   // Show all columns by default if visibleColumns is not provided
   // const displayedColumns = visibleColumns?.length
   //    ? columns.filter((col) => visibleColumns.includes(col.keyName))
   //    : columns;
   // Determine if visibleColumns is empty
   const isVisibleColumnsEmpty = Object.keys(columnVisibility).length === 0;

   // Conditionally filter columns based on visibility
   const displayedColumns = isVisibleColumnsEmpty
      ? columns // Show all columns if visibleColumns is empty
      : columns.filter((col) => columnVisibility[col.id] !== false);

   return (
      <table className='w-full border'>
         <thead>
            <tr className='border-b'>
               <th className='p-2 align-middle'>
                  <input type="checkbox" id='ok' checked={selectAll} onChange={handleSelectAll} className='hidden' />
                  <label htmlFor='ok'
                     className={cn(
                        `block w-4 h-4 border border-black rounded-sm overflow-hidden cursor-pointer`,
                        {
                           'border-black bg-black text-white': selectAll
                        }
                     )}
                  >
                     {
                        selectAll &&
                        <span className='flex items-center justify-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M20 6 9 17l-5-5"></path></svg>
                        </span>
                     }
                  </label>
               </th>
               {displayedColumns?.map((column: ColumnType, index: number) => (
                  <th key={index} className={cn(` p-2`, column?.className)}>
                     <div role='button' className="text-left font-medium flex items-center" onClick={() => sortData(column?.id)}>
                        {column?.header}
                        {column?.sortable && (
                           <span className='ms-1'>
                              <button className={`${sortOrder[column?.id] === 'asc' ? 'text-gray-500' : 'text-gray-300'}`}>
                                 <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                              </button>
                              <button className={`${sortOrder[column?.id] === 'desc' ? 'text-gray-500' : 'text-gray-300'}`}>
                                 <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                              </button>
                           </span>
                        )}
                     </div>
                  </th>
               ))}
            </tr>
         </thead>
         <tbody>
            {
               loading ?
                  <tr>
                     <td colSpan={columns.length + 1} className='text-center text-gray-400 p-9'>Loading ...</td>
                  </tr>
                  :
                  data?.length === 0 ?
                     <tr>
                        <td colSpan={columns.length + 1} className='text-center text-gray-400 p-9'>No data</td>
                     </tr>
                     :
                     data?.map((row: NestedObjectType, index: number) => (
                        <tr key={index} className='border-b hover:bg-gray-100'>
                           <td className='p-2 align-middle'>
                              <div className="">
                                 <input type="checkbox" id={`cb_${row?.id}`} checked={selectedRow.includes(row?.id)} onChange={(e) => handleProductCheck(row?.id, e)} className='hidden' />
                                 <label htmlFor={`cb_${row?.id}`}
                                    className={cn(
                                       `block w-4 h-4 border border-black rounded-sm overflow-hidden cursor-pointer`,
                                       {
                                          'border-black bg-black text-white': selectedRow.includes(row?.id)
                                       }
                                    )}
                                 >
                                    {
                                       selectedRow.includes(row?.id) &&
                                       <span className='flex items-center justify-center'>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M20 6 9 17l-5-5"></path></svg>
                                       </span>
                                    }

                                 </label>
                              </div>
                           </td>
                           {displayedColumns?.map((column: ColumnType, index: number) => (
                              <td key={index} className={cn(`p-2`, column?.className)}>
                                 {column?.render(row)}
                              </td>
                           ))}
                        </tr>
                     ))
            }
         </tbody>
      </table>
   )
}

// type ColumnVisibility = { [key: string]: boolean; };
// type OnColumnVisibility = (columnId: string, isVisible: boolean) => void;
// interface UseTableProps {
//    columns?: ColumnType[];
//    columnVisibility?: ColumnVisibility;
//    onColumnVisibility?: OnColumnVisibility;
// }
// interface UseTableReturn {
//    columns: ColumnType[];
//    columnVisibility: ColumnVisibility;
//    onColumnVisibility?: OnColumnVisibility;
// }

// function useTable({ columns = [], columnVisibility = {}, onColumnVisibility }: UseTableProps): UseTableReturn {
//    const [visibility, setVisibility] = useState([])
//    const data = [
//       { id: 1, name: 'Alice', visibility: true },
//       { id: 2, name: 'Bob', visibility: false },
//       { id: 3, name: 'Charlie', visibility: true },
//    ];

//    // Add a function to update visibility of a specific item in the array
//    const addUpdateVisibilityFunction = (array) => {
//       const newData = array.map(item => ({
//          ...item,
//          // Function to toggle or update visibility
//          updateVisibility(newVisibility) {
//             console.log('Updated visibility', newVisibility)
//             return {
//                ...item,
//                visibility: newVisibility,
//             };
//          },
//       }));
//       return newData
//    };

//    // Adding the function to each object in the data array
//    const updatedData = addUpdateVisibilityFunction(data);

//    console.log('table visibility =>', updatedData)


//    return {
//       columns,
//       columnVisibility,
//       onColumnVisibility,
//       updatedData
//    }
// }

export {
   DataTable,
   // useTable
} 