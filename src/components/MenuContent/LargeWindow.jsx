import React from 'react'
import { ArrowLeft,X } from 'lucide-react';

const LargeWindow = ({ show, setShow, title, children, onBack }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setShow(false)} />
        <div className="relative w-11/12 md:w-1/3 h-[75vh] bg-white rounded-md z-50 overflow-hidden border border-gray-200">
          <div className="flex justify-between items-center pt-3 pb-2 px-6 border-b border-gray-200 bg-gray-100">
            <div className="flex items-center">
              <button onClick={onBack} className="mr-2">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            </div>
            <X className="w-5 h-5 cursor-pointer text-gray-600" onClick={() => setShow(false)} />
          </div>
          <div className="h-full max-h-[65vh] overflow-y-auto p-6 bg-white">
            {children}
          </div>
        </div>
      </div>
    );
  };

export default LargeWindow
