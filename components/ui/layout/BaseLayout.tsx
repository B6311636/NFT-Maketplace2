
import { FunctionComponent } from "react";
import Navbar from "../navbar";
import Footer from "@ui/footer";

const BaseLayout: FunctionComponent = ({ children }) => {

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 overflow-hidden min-h-screen pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
      <div className="pt-10">
        <Footer />
      </div>
    </>
  )
}

export default BaseLayout;
