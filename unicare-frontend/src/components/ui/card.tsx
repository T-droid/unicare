import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div 
      className={`bg-white rounded-lg shadow ${className || ''}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div 
      className={`p-6 ${className || ''}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div 
      className={`p-6 pt-0 ${className || ''}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <h3 
      className={`text-lg font-semibold ${className || ''}`} 
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...props }: CardProps) {
  return (
    <p 
      className={`text-sm text-gray-600 ${className || ''}`} 
      {...props}
    >
      {children}
    </p>
  )
}