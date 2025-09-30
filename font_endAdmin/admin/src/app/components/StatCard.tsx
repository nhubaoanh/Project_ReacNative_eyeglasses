import React from "react"
import { motion } from "framer-motion"


type StatCardProps = {
  name: string
  value: string | number
  Icon?: React.ElementType // 👈 đổi từ React.ReactNode sang ElementType
}

export default function StatCard({ name, Icon, value }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"}}
      className="bg-[#1e1e1e] backdrop-blur-md rounded-md overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-300">
          {Icon && <Icon size={24} className="mr-2" />}
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
      </div>
    </motion.div>
  )
}
