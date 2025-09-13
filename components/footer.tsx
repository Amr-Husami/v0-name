import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-rose-400">أمي وطفلي</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              متجرك الموثوق لكل مستلزمات الأمومة والطفولة. نقدم منتجات عالية الجودة لرحلة أمومة سعيدة وآمنة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-rose-400">
                📱
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-rose-400">
                📧
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-rose-400">
                🐦
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  المنتجات
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  العروض
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">خدمة العملاء</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  سياسة الإرجاع
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  الشحن والتوصيل
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  الدعم الفني
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  تتبع الطلب
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">النشرة البريدية</h4>
            <p className="text-gray-300 text-sm">اشتركي للحصول على أحدث العروض والمنتجات الجديدة</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-rose-600 hover:bg-rose-700 shrink-0">اشتراك</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2024 أمي وطفلي. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                الشروط والأحكام
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
