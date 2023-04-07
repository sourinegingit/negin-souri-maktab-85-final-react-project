import { useState, React } from "react";
import { Link } from "react-router-dom";
import ProductManaging from "../components/admin/tabs/productManaging";
import StockPriceManagment from "../components/admin/tabs/stockPriceManagment";
import OrdersManaging from "../components/admin/tabs/ordersManaging";

const PanelAdminHeader = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const handleClick = (id) => {
    if (id === 1) {
      return setCurrentTab(1);
    } else if (id === 2) {
      return setCurrentTab(2);
    } else if (id === 3) {
      return setCurrentTab(3);
    }
  };
  const [navbar, setNavbar] = useState(false);
  let title = [
    { name: "کالا ها", id: 1 },
    { name: " موجودی و قیمت  ها", id: 2 },
    { name: "سفارش  ها", id: 3 }
  ];
  return (
    <>
      <nav className="w-full bg-gray-500 shadow mb-20">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <div className="flex items-center justify-between gap-4">
                <a href="javascript:void(0)">
                  <h4 className="text-xl font-bold text-orange-800">
                    
                    پنل مدیریت فروشگاه
                  </h4>
                </a>
              </div>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 gap-12">
                {title.map((item) => {
                  return (
                    <li
                      onClick={() => handleClick(item.id)}
                      className={`text-white cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-400 w-34 p-2.5 h-8 hover:text-white
                       rounded-xl ${
                        currentTab === item.id ? "bg-slate-300 text-gray-800" : ""
                      }`}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 gap-12">
                <li className="text-white hover:text-orange-400 flex items-center justify-center gap-2">
                  <Link to="/">بازگشت به سایت</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {currentTab === 1 && <ProductManaging />}

      {currentTab === 2 && <StockPriceManagment />}

      {currentTab === 3 && <OrdersManaging />}
    </>
  );
};
export default PanelAdminHeader;
