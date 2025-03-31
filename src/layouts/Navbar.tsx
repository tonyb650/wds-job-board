import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { THEME_OPTIONS } from "@/constants/constants"
import useTheme from "@/hooks/useTheme"
import { Moon, Sun } from "lucide-react"
import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b-2 py-5 px-10">
      <a href="#" className="text-xl">WDS App</a>
      <div className="flex items-center space-x-8">
        <ThemeToggleButton/>

        <Button variant={"ghost"}>
          <Link to="/tasks">
            Task Board
          </Link>
        </Button>

        <Button variant={"ghost"}>
          <Link to="/jobs">
            Job Listings
          </Link>
        </Button>

        <Button variant={"ghost"}>
          <Link to="/user">
            User
          </Link>
        </Button>

        </div>
    </nav>
  )
}

export default Navbar




/* Resources for this component
  About RadixUI 'Slot' & 'asChild': https://www.youtube.com/watch?v=r0I-pzcE8dg
  About 'cva' (component variants): https://www.youtube.com/watch?v=qGQRdCg6JRQ (Brooks Lybrand)
*/
const ThemeToggleButton = () => {
  
  const {setTheme} = useTheme()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="">
          <span className="sr-only">Open theme menu</span>
          {/* 'transition-transform' seems to zoom in and out for the Sun & Moon icons */}
          <Sun className="h-5 w-5 scale-100 dark:scale-0 transition-transform" />
          <Moon className="absolute h-5 w-5 scale-0 dark:scale-100 transition-transform" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEME_OPTIONS.map((theme) => (
          <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}