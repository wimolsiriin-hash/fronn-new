"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { User, UserPlus, ArrowRight, ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function FormRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    txt_username: "",
    txt_firstname: "",
    txt_lastname: "",
    txt_email: "",
    txt_password: "",
    txt_confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldLabels = {
      txt_username: "ชื่อผู้ใช้งาน",
      txt_firstname: "ชื่อ",
      txt_lastname: "นามสกุล",
      txt_email: "อีเมล",
      txt_password: "รหัสผ่าน",
      txt_confirmPassword: "ยืนยันรหัสผ่าน",
    };

    const missingKeys = Object.keys(fieldLabels).filter(
      (key) => !form[key]?.trim()
    );

    if (missingKeys.length > 0) {
      const missingNames = missingKeys.map((key) => fieldLabels[key]).join(", ");
      Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลไม่ครบถ้วน",
        text: `กรุณากรอกช่อง: ${missingNames}`,
        confirmButtonColor: "#1d4ed8",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.txt_email)) {
      Swal.fire({
        icon: "warning",
        title: "รูปแบบอีเมลไม่ถูกต้อง",
        text: "กรุณาระบุอีเมลให้ถูกต้อง (เช่น example@domain.com)",
        confirmButtonColor: "#1d4ed8",
      });
      return;
    }

    if (form.txt_password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "รหัสผ่านสั้นเกินไป",
        text: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
        confirmButtonColor: "#1d4ed8",
      });
      return;
    }

    if (form.txt_password !== form.txt_confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณาตรวจสอบช่องรหัสผ่านและยืนยันรหัสผ่านอีกครั้ง",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

try {
      setIsLoading(true);

      const REGISTER_URL = "https://api.itdev.cmtc.ac.th/auth/register";

      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.txt_username,
          firstname: form.txt_firstname,
          lastname: form.txt_lastname,
          email: form.txt_email,
          password: form.txt_password,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ",
          text: "กำลังนำคุณไปยังหน้าเข้าสู่ระบบ...",
          timer: 1500,
          showConfirmButton: false,
        });

        router.push("/login");
        return;
      }

      if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${response.status})`,
          text: result.message || "กรุณาตรวจสอบข้อมูลที่กรอก",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fecc00",
        });
      } else if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: `เกิดข้อผิดที่เซิร์ฟเวอร์ (status: ${response.status})`,
          text: result.message || "กรุณาลองใหม่ภายหลัง",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fe0505",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: `สมัคร " ไม่สำเร็จ (status: ${response.status})`,
          text: result.message || "เกิดข้อผิด ",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ network error",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-6 overflow-hidden">
      {/* Dynamic Glow Backgrounds */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Glass Card */}
      <div className="relative w-full max-w-xl bg-slate-900/70 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-blue-950/80 border border-blue-500/20 p-8 transition-all duration-300">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-400 text-white shadow-lg shadow-cyan-500/20 mb-4 transition-transform hover:scale-105 duration-300">
            <UserPlus className="w-7 h-7 text-cyan-100" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            สมัครสมาชิก
          </h1>
          <p className="text-sm text-cyan-200/70 mt-2 font-medium">
            กรอกข้อมูลเพื่อเริ่มต้นใช้งานระบบ
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          
          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-2">
              ชื่อผู้ใช้งาน (Username) <span className="text-red-400">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="txt_username"
                autoComplete="off"
                value={form.txt_username}
                onChange={handleChange}
                placeholder="ตั้งชื่อผู้ใช้งาน"
                className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-slate-950/80 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-2">
                ชื่อ <span className="text-red-400">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="txt_firstname"
                  autoComplete="off"
                  value={form.txt_firstname}
                  onChange={handleChange}
                  placeholder="ระบุชื่อของคุณ"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-slate-950/80 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-2">
                นามสกุล <span className="text-red-400">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="txt_lastname"
                  autoComplete="off"
                  value={form.txt_lastname}
                  onChange={handleChange}
                  placeholder="ระบุนามสกุลของคุณ"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-slate-950/80 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-2">
              อีเมล (Email) <span className="text-red-400">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="txt_email"
                autoComplete="off"
                value={form.txt_email}
                onChange={handleChange}
                placeholder="example@domain.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-slate-950/80 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-2">
                รหัสผ่าน <span className="text-red-400">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="txt_password"
                  autoComplete="new-password"
                  value={form.txt_password}
                  onChange={handleChange}
                  placeholder="กรอกรหัสผ่าน"
                  className="w-full pl-11 pr-11 py-3 bg-slate-950/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-slate-950/80 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-2">
                ยืนยันรหัสผ่าน <span className="text-red-400">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="txt_confirmPassword"
                  autoComplete="new-password"
                  value={form.txt_confirmPassword}
                  onChange={handleChange}
                  placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                  className="w-full pl-11 pr-11 py-3 bg-slate-950/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-slate-950/80 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden py-3.5 px-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 focus:ring-4 focus:ring-cyan-500/20 active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 mt-4 cursor-pointer"
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>กำลังบันทึกข้อมูล...</span>
                </>
              ) : (
                <>
                  <span>สมัครสมาชิก</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </div>
          </button>
        </form>

        {/* Footer / Back to Login Link */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-400 font-medium">
            มีบัญชีอยู่แล้ว?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="inline-flex items-center gap-1 text-cyan-400 font-semibold hover:text-cyan-300 hover:underline transition-colors focus:outline-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              กลับไปหน้าเข้าสู่ระบบ
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
