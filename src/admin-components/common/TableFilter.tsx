'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
} from '@/components/ui/command';
import { Check, PlusCircle } from 'lucide-react';

interface DataTableFacetedFilterProps {
   title?: string;
   options: {
      label: string;
      value: string;
   }[];
   setFilter?: (value: string[]) => void;
   value?: string[]
}

export function TableFilter({
   title,
   options,
   setFilter,
   value
}: DataTableFacetedFilterProps) {
   const selectedValues = new Set(value as string[])
   // console.log('selectedValues', selectedValues)

   // Toggle selected options in the Set.
   const handleToggleOption = (option: { value: string }) => {
      const newSelectedValues = new Set(selectedValues);
      if (newSelectedValues.has(option.value)) {
         newSelectedValues.delete(option.value);
      } else {
         newSelectedValues.add(option.value);
      }
      // Convert Set to Array for filtering.
      const filterValues = Array.from(newSelectedValues) || [];
      setFilter(filterValues)
   };

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
               <PlusCircle />
               {title}
               {selectedValues.size > 0 && (
                  <>
                     <Separator orientation="vertical" className="mx-2 h-4" />
                     <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal lg:hidden"
                     >
                        {selectedValues.size}
                     </Badge>
                     <div className="hidden space-x-1 lg:flex">
                        {selectedValues.size > 2 ? (
                           <Badge
                              variant="secondary"
                              className="rounded-sm px-1 font-normal"
                           >
                              {selectedValues.size} selected
                           </Badge>
                        ) : (
                           options
                              .filter((option) =>
                                 selectedValues.has(option.value)
                              )
                              .map((option) => (
                                 <Badge
                                    variant="secondary"
                                    key={option.value}
                                    className="rounded-sm px-1 font-normal"
                                 >
                                    {option.label}
                                 </Badge>
                              ))
                        )}
                     </div>
                  </>
               )}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
               <CommandInput placeholder={title} />
               <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                     {options.map((option) => {
                        const isSelected = selectedValues.has(option.value);
                        return (
                           <CommandItem
                              key={option.value}
                              onSelect={() => handleToggleOption(option)}
                           >
                              <div
                                 className={cn(
                                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                    isSelected
                                       ? 'bg-primary text-primary-foreground'
                                       : 'opacity-50 [&_svg]:invisible'
                                 )}
                              >
                                 <Check />
                              </div>
                              <span>{option.label}</span>
                              {/* {facets?.get(option.value) && (
                                 <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                    {facets.get(option.value)}
                                 </span>
                              )} */}
                           </CommandItem>
                        );
                     })}
                  </CommandGroup>
                  {selectedValues.size > 0 && (
                     <>
                        <CommandSeparator />
                        <CommandGroup>
                           <CommandItem
                              onSelect={() => {
                                 setFilter([])
                              }}
                              className="justify-center text-center"
                           >
                              Clear filters
                           </CommandItem>
                        </CommandGroup>
                     </>
                  )}
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   );
}