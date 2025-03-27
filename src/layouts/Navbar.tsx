import { MoonIcon, MoreHorizontal, SunIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATUSES } from "@/features/task-list/constants/constants"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b-2 py-5 px-10">
      <a href="#" className="text-xl">WDS App</a>
      <ul className="flex items-center space-x-4">
        <SelectTheme/>
        <li>Task Board</li>
      </ul>
    </nav>
  )
}

export default Navbar

const themes = ["Light", "Dark", "System"]

function SelectTheme() {

  const handleThemeChange = (theme: string) => {
    switch (theme) {
      case "Light":
        document.documentElement.classList.remove("dark")
        break
      case "Dark":
        document.documentElement.classList.add("dark")
        break
      case "System":
        document.documentElement.classList.toggle("dark")
        break
      default:
        break
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="">
          <span className="sr-only">Open theme menu</span>
          <SunIcon className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem key={theme} onClick={() => handleThemeChange(theme)}>
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}