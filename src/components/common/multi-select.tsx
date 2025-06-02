"use client"

import * as React from "react"
import { X } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type Option = {
   value: number | string
   label: string
}

interface MultiSelectProps {
   options: Option[]
   selected: (number | string)[]
   onChange: (selected: (number | string)[]) => void
   placeholder?: string
   className?: string
}

export function MultiSelect({
   options,
   selected,
   onChange,
   placeholder = "Select items...",
   className,
}: MultiSelectProps) {
   const [open, setOpen] = React.useState(false)

   const handleUnselect = (item: number | string) => {
      onChange(selected.filter((i) => i !== item))
   }

   const handleSelect = (value: number | string) => {
      if (selected.includes(value)) {
         onChange(selected.filter((item) => item !== value))
      } else {
         onChange([...selected, value])
      }
   }

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <div
               role="combobox"
               aria-expanded={open}
               className={cn(
                  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                  className,
               )}
               onClick={() => setOpen(!open)}
            >
               <div className="flex flex-wrap gap-1">
                  {selected.length > 0 ? (
                     selected.map((item) => {
                        const selectedOption = options.find((option) => option.value === item)
                        return (
                           <Badge key={String(item)} variant="secondary" className="mr-1 mb-1">
                              {selectedOption?.label}
                              <button
                                 className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                 onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                       handleUnselect(item)
                                    }
                                 }}
                                 onMouseDown={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                 }}
                                 onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleUnselect(item)
                                 }}
                              >
                                 <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                           </Badge>
                        )
                     })
                  ) : (
                     <span className="text-muted-foreground">{placeholder}</span>
                  )}
               </div>
            </div>
         </PopoverTrigger>
         <PopoverContent className="min-w-80 p-0" align="start">
            <Command>
               <CommandInput placeholder="Search..." />
               <CommandList>
                  <CommandEmpty>No item found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                     {options.map((option) => {
                        const isSelected = selected.includes(option.value)
                        return (
                           <CommandItem
                              key={String(option.value)}
                              value={option.label.toLowerCase()}
                              onSelect={() => handleSelect(option.value)}
                           >
                              <div
                                 className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                                 )}
                              >
                                 <svg
                                    className={cn("h-3 w-3")}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                 >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                 </svg>
                              </div>
                              <span>{option.label}</span>
                           </CommandItem>
                        )
                     })}
                  </CommandGroup>
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   )
}
