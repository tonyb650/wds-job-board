import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger

} from "@/components/ui/dropdown-menu"
import { THEME_OPTIONS } from "@/constants/constants"
import useAuth from "@/features/authentication/hooks/useAuth"
import useTheme from "@/hooks/useTheme"
import capitalize from "@/utils/capitalize"
import { Moon, Sun, Menu, ChevronDown } from "lucide-react"
import { Link } from "react-router"

const Navbar = () => {

  const {user} = useAuth()

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b p-4 bg-white dark:bg-slate-950">
      <div className="container flex justify-between items-center gap-4">

        <span className="text-xl">WDS App</span>

        <div className="flex">
          <ThemeToggleButton/>
          {/* Desktop */}
          <div className="hidden sm:flex">
            <NavItem link="/tasks" label="Task Board"/>
            <NavItem link="/jobs" label="Job Listings"/>
            { !user ?
              <NavItem link="/login" label="Login"/> 
              :
              <UserMenu />
            }
          </div>

          {/* Mobile */}
          <div className="sm:hidden">

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800">
                  <Menu/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild>
                  <Link to="/tasks">
                    Task Board
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/jobs">
                    Job Listings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                { !user ? 
                  <DropdownMenuItem asChild>
                    <Link to="/login">
                      Login
                    </Link>
                  </DropdownMenuItem>
                  :

                    <UserMenuSub/>

                }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

const NavItem = ({link, label}: {link: string, label: string}) => {
  return (
    <Button variant={"ghost"} asChild>
      <Link to={link}>
        {label}
      </Link>
    </Button>
  )
}



const ThemeToggleButton = () => {
  
  const {setTheme} = useTheme()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800">
          <span className="sr-only">Open theme menu</span>
          {/* 'transition-transform' seems to zoom in and out for the Sun & Moon icons */}
          <Sun className="h-5 w-5 scale-100 dark:scale-0 transition-transform" />
          {/* 'absolute' is needed here so that Sun and Moon sit directly on top of one another */}
          <Moon className="absolute h-5 w-5 scale-0 dark:scale-100 transition-transform" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"> 
        {THEME_OPTIONS.map((theme) => (
          <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
            {capitalize(theme)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const UserMenu = () => {
  const {user, logout} = useAuth()

  if (!user)return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 pr-0"
        >
          {user.email}
          <ChevronDown size={16} className="ml-2"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem asChild>
          <Link to="/jobs">My Listings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const UserMenuSub = () => {
  const {user, logout} = useAuth()

  if (!user)return null

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger asChild>
        <Button
        size="sm"
          variant="ghost"
          className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
        >
          {user.email}
          <ChevronDown size={16} className="ml-2"/>
        </Button>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent >
        <DropdownMenuItem asChild>
          <Link to="/jobs">My Listings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}

