import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Path, PathValue, UseFormReturn } from "react-hook-form";
import { FilterFormValues, JOB_LISTING_TYPES_FILTER_OPTIONS } from "../hooks/useJobListingFiltersForm";
import { CheckedState } from "@radix-ui/react-checkbox";
import { JOB_LISTING_EXPERIENCE_LEVELS } from "../constants/schemas";
import { cn } from "@/utils/shadcnUtils";


type JobListingFilterFormProps = {
  form: UseFormReturn<FilterFormValues>, 
  className?: string, 
}

const JobListingFilterForm = ({ form, className }: JobListingFilterFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={e => e.preventDefault()} className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minimumSalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Salary</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min={0}
                  {...field}
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                  value={isNaN(field.value) ? "" : field.value}  
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* JOB TYPE STARTS HERE */}
        {/* I left this as my naive way of handling 'Any' (see the schema in useJobListingFiltersForm) */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <Select
                onValueChange={(val) =>
                  field.onChange(
                    val as PathValue<
                      typeof JOB_LISTING_TYPES_FILTER_OPTIONS,
                      Path<typeof JOB_LISTING_TYPES_FILTER_OPTIONS>
                    >
                  )
                }
                defaultValue="Any"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {JOB_LISTING_TYPES_FILTER_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* EXPERIENCE LEVEL STARTS HERE */}
        {/* This is the better way to handle the default selection */}
        <FormField
          control={form.control}
          name="experienceLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <Select
                onValueChange={(val) =>
                  field.onChange(
                    val as PathValue<
                      typeof JOB_LISTING_EXPERIENCE_LEVELS,
                      Path<typeof JOB_LISTING_EXPERIENCE_LEVELS>
                    >
                  )
                }
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="">Any</SelectItem>
                    {JOB_LISTING_EXPERIENCE_LEVELS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <div>
            <FormField
              control={form.control}
              name="showHidden"
              render={({ field }) => (
                <FormItem className="space-x-3">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={(checked: CheckedState) => {
                        field.onChange(checked === "indeterminate" ? false : checked)
                      }}
                    />
                  </FormControl>
                  <FormLabel>Show Hidden</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="favoritesOnly"
              render={({ field }) => (
                <FormItem className="space-x-3">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={(checked: CheckedState) => {
                        field.onChange(!!(checked))
                      }}
                    />
                  </FormControl>
                  <FormLabel>Show Only Favorites</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="button" onClick={() => form.reset()}>Reset</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default JobListingFilterForm;
