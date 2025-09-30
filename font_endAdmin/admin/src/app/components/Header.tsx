"use client"
import React, { useState, useRef, useEffect } from "react"

export default function Header() {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleLogout = () => {
    console.log("Đăng xuất")
    // TODO: viết logic đăng xuất (xóa token, router.push("/login"))
  }

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="p-5 bg-[#1e1e1e] rounded-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        <div className="relative" ref={dropdownRef}>
          <img
            src="http://weart.vn/wp-content/uploads/2025/06/gai-xinh-tu-suong-voi-anh-sang-tu-nhien-va-bieu-cam-rang-ro.jpg"
            alt="avatar"
            className="rounded-full shadow-md cursor-pointer h-10 w-10"
            onClick={() => setOpen(!open)}
          />

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] rounded-md shadow-lg py-2 z-50">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                onClick={() => console.log("Trang cá nhân")}
              >
                Trang cá nhân
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                onClick={() => console.log("Cài đặt")}
              >
                Cài đặt
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
