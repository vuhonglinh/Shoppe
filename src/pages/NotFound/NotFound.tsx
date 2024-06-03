import { Link } from "react-router-dom";
import path from "src/contexts/path";


export default function NotFound() {
  return (
    <section className="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
      <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-orange dark:text-gray-100">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl md:text-3xl dark:text-gray-300">Xin lỗi, chúng tôi không thể tìm thấy trang này.</p>
          <Link to={path.home} className="px-8 py-4 text-xl font-semibold rounded bg-orange text-gray-50 hover:text-gray-200">Quay lại trang chủ</Link>
        </div>
      </div>
    </section>

  )
}
