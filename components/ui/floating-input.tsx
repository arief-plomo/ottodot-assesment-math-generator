import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

const inputVariants = cva(
  "flex w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm text-sm ring-offset-background transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input hover:border-purple-300 focus:border-purple-500",
        filled: "bg-muted/50 border-transparent hover:bg-muted/70 focus:bg-background focus:border-purple-500",
        ghost: "border-transparent bg-transparent hover:bg-muted/30 focus:bg-background focus:border-purple-500",
        glass: "bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 focus:bg-white/30 focus:border-white/40"
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-12 px-4",
        lg: "h-14 px-6 text-lg",
        xl: "h-16 px-8 text-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface FloatingInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  success?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  showPasswordToggle?: boolean
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ 
    className, 
    variant,
    size,
    type,
    label,
    error,
    success,
    icon,
    iconPosition = "left",
    showPasswordToggle = false,
    id,
    placeholder,
    value,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(Boolean(value))
    
    const inputId = id || React.useId()
    const inputType = showPasswordToggle && showPassword ? 'text' : type
    
    React.useEffect(() => {
      setHasValue(Boolean(value))
    }, [value])

    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(Boolean(e.target.value))
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(e.target.value))
      props.onChange?.(e)
    }

    const isFloating = isFocused || hasValue || placeholder

    return (
      <div className="relative w-full">
        <div className="relative">
          {/* Left Icon */}
          {icon && iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
              {icon}
            </div>
          )}
          
          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            id={inputId}
            className={cn(
              inputVariants({ variant, size }),
              icon && iconPosition === "left" && "pl-10",
              (icon && iconPosition === "right") || showPasswordToggle ? "pr-10" : "",
              error && "border-destructive focus:border-destructive focus:ring-destructive",
              success && "border-green-500 focus:border-green-500 focus:ring-green-500",
              label && "placeholder-transparent",
              className
            )}
            placeholder={label ? " " : placeholder}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {/* Floating Label */}
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-4 transition-all duration-300 pointer-events-none text-sm font-medium",
                icon && iconPosition === "left" && "left-10",
                isFloating
                  ? "top-2 text-xs text-purple-600 dark:text-purple-400"
                  : "top-1/2 transform -translate-y-1/2 text-muted-foreground",
                error && isFloating && "text-destructive",
                success && isFloating && "text-green-600"
              )}
            >
              {label}
            </label>
          )}

          {/* Right Icon / Password Toggle */}
          {((icon && iconPosition === "right") || showPasswordToggle) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {showPasswordToggle && type === "password" ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              ) : (
                icon && iconPosition === "right" && (
                  <div className="text-muted-foreground">
                    {icon}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Error/Success Message */}
        {(error || success) && (
          <div className={cn(
            "mt-2 text-xs font-medium transition-all duration-300",
            error ? "text-destructive" : "text-green-600"
          )}>
            {error || (success && "Valid input")}
          </div>
        )}
      </div>
    )
  }
)
FloatingInput.displayName = "FloatingInput"

export { FloatingInput, inputVariants }